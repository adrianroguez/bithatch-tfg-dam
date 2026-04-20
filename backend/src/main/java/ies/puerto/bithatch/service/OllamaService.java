package ies.puerto.bithatch.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import ies.puerto.bithatch.model.entities.Creature;
import ies.puerto.bithatch.repository.CreatureRepository;
import ies.puerto.bithatch.repository.UserRepository;

/**
 * Servicio que gestiona la comunicacion con el modelo de IA Ollama.
 * Genera respuestas contextualizadas usando los datos de la criatura del usuario.
 */
@Service
public class OllamaService {

    private final ChatClient chatClient;
    private final UserRepository userRepository;
    private final CreatureRepository creatureRepository;

    public OllamaService(ChatClient.Builder chatClientBuilder,
                         UserRepository userRepository,
                         CreatureRepository creatureRepository) {
        this.chatClient = chatClientBuilder.build();
        this.userRepository = userRepository;
        this.creatureRepository = creatureRepository;
    }

    /**
     * Genera una respuesta del modelo usando el contexto de la criatura del usuario.
     *
     * @param username Nombre de usuario autenticado.
     * @param message  Mensaje enviado por el usuario.
     * @return Respuesta generada por el modelo de IA.
     */
    public String chat(String username, String message) {
        String systemPrompt = buildSystemPrompt(username);

        return chatClient.prompt()
                .system(systemPrompt)
                .user(message)
                .call()
                .content();
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
