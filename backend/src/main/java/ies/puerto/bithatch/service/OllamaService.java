package ies.puerto.bithatch.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import ies.puerto.bithatch.model.entities.Creature;
import ies.puerto.bithatch.model.entities.User;
import ies.puerto.bithatch.model.entities.ChatMessage;
import ies.puerto.bithatch.repository.ChatMessageRepository;
import ies.puerto.bithatch.repository.CreatureRepository;
import ies.puerto.bithatch.repository.UserRepository;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.SystemMessage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Servicio que gestiona la comunicacion con el modelo de IA Ollama.
 * Genera respuestas contextualizadas usando los datos de la criatura del usuario.
 */
@Service
public class OllamaService {

    private final ChatClient chatClient;
    private final UserRepository userRepository;
    private final CreatureRepository creatureRepository;
    private final ChatMessageRepository chatMessageRepository;

    public OllamaService(ChatClient.Builder chatClientBuilder,
                         UserRepository userRepository,
                         CreatureRepository creatureRepository,
                         ChatMessageRepository chatMessageRepository) {
        this.chatClient = chatClientBuilder.build();
        this.userRepository = userRepository;
        this.creatureRepository = creatureRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    /**
     * Genera una respuesta del modelo usando el contexto de la criatura del usuario.
     *
     * @param username Nombre de usuario autenticado.
     * @param message  Mensaje enviado por el usuario.
     * @return Respuesta generada por el modelo de IA.
     */
    public String chat(String username, String message) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return "Usuario no encontrado";
        }
        User user = userOpt.get();

        // 1. Guardar mensaje del usuario
        ChatMessage userMsg = new ChatMessage(user, "USER", message);
        chatMessageRepository.save(userMsg);

        // 2. Obtener historial (max 20) y ordenarlo cronologicamente
        List<ChatMessage> history = chatMessageRepository.findTop20ByUserIdOrderByCreatedAtDesc(user.getId());
        Collections.reverse(history);

        // 3. Preparar lista de mensajes para Spring AI
        List<Message> springAiMessages = new ArrayList<>();
        springAiMessages.add(new SystemMessage(buildSystemPrompt(username)));

        for (ChatMessage msg : history) {
            if ("USER".equalsIgnoreCase(msg.getRole())) {
                springAiMessages.add(new UserMessage(msg.getContent()));
            } else {
                springAiMessages.add(new AssistantMessage(msg.getContent()));
            }
        }

        // 4. Llamar al modelo de IA
        String responseContent = chatClient.prompt()
                .messages(springAiMessages)
                .call()
                .content();

        // 5. Guardar respuesta del asistente
        ChatMessage assistantMsg = new ChatMessage(user, "ASSISTANT", responseContent);
        chatMessageRepository.save(assistantMsg);

        return responseContent;
    }

    /**
     * Obtiene el historial reciente de chat del usuario.
     *
     * @param username Nombre de usuario.
     * @return Lista de mensajes del historial.
     */
    public List<ChatMessage> getChatHistory(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) {
            return Collections.emptyList();
        }
        
        List<ChatMessage> history = chatMessageRepository.findTop20ByUserIdOrderByCreatedAtDesc(userOpt.get().getId());
        Collections.reverse(history);
        return history;
    }

    /**
     * Construye el system prompt en funcion de si el usuario tiene criatura o no.
     *
     * @param username Nombre de usuario.
     * @return System prompt para el modelo.
     */
    private String buildSystemPrompt(String username) {
        return userRepository.findByUsername(username)
                .flatMap(user -> creatureRepository.findByOwnerId(user.getId()))
                .map(this::buildCreaturePrompt)
                .orElse(buildDefaultPrompt());
    }

    /**
     * System prompt cuando el usuario tiene una criatura activa.
     *
     * @param creature Entidad de la criatura.
     * @return Prompt con contexto de la criatura.
     */
    private String buildCreaturePrompt(Creature creature) {
        return String.format(
                "Eres %s, una criatura virtual de tipo %s con personalidad %s. " +
                "Tu nivel actual es %d, tienes %d/100 de energia y %d/100 de felicidad. " +
                "%s" +
                "" +
                "Responde siempre en primera persona, como si fueras la criatura hablando con tu entrenador. " +
                "Adapta tu tono a tu personalidad. Se breve.",
                creature.getName(),
                creature.getEggType().name(),
                creature.getPersonality().name(),
                creature.getLevel(),
                creature.getEnergy(),
                creature.getHappiness(),
                creature.isHatched()
                        ? "Ya has nacido del huevo y eres una criatura activa. "
                        : "Todavia eres un huevo sin eclosionar. "
        );
    }

    /**
     * System prompt de fallback cuando el usuario no tiene criatura.
     *
     * @return Prompt generico de BitHatch.
     */
    private String buildDefaultPrompt() {
        return "Eres el coach del usuario, en una aplicacion de mascotas virtuales estilo Tamagotchi. " +
               "Ayuda al usuario con dudas sobre la app. Se amigable y breve.";
    }
}
