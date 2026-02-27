package ies.puerto.bithatch.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Necesitarás este repo

import ies.puerto.bithatch.dto.CreatureCreateRequest;
import ies.puerto.bithatch.dto.CreatureResponse;
import ies.puerto.bithatch.model.entities.Creature;
import ies.puerto.bithatch.model.entities.User;
import ies.puerto.bithatch.repository.CreatureRepository;
import ies.puerto.bithatch.repository.UserRepository;

/**
 * Servicio que implementa la logica de negocio relacionada con las criaturas.
 */
@Service
public class CreatureService {

    private final CreatureRepository creatureRepository;
    private final UserRepository userRepository;

    @Autowired
    public CreatureService(CreatureRepository creatureRepository, UserRepository userRepository) {
        this.creatureRepository = creatureRepository;
        this.userRepository = userRepository;
    }

    /**
     * Crea la criatura inicial (starter) a partir de un DTO de peticion.
     * 
     * @param request Datos de la creacion (nombre y huevo).
     * @param userId  ID del usuario que crea la criatura.
     * @return DTO con la criatura creada.
     */
    @Transactional
    public CreatureResponse createStarterFromDto(CreatureCreateRequest request, Long userId) {
        // 1. Validar que el usuario existe
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Validar que el usuario no tenga ya una criatura
        if (creatureRepository.existsByOwnerId(userId)) {
            throw new RuntimeException("El usuario ya posee una criatura");
        }

        // 3. Crear la entidad usando el constructor que definimos
        Creature creature = new Creature(
                request.getName(),
                request.getEggType(),
                owner);

        // 4. Guardar y devolver convertida a Response
        Creature saved = creatureRepository.save(creature);
        return new CreatureResponse(saved);
    }

    /**
     * Obtiene todas las criaturas del sistema (Para ADMIN).
     * 
     * @return Lista de todas las criaturas.
     */
    public List<CreatureResponse> getAllCreatures() {
        return creatureRepository.findAll()
                .stream()
                .map(CreatureResponse::new)
                .collect(Collectors.toList());
    }

    /**
     * Busca la criatura de un usuario especifico.
     * 
     * @param userId ID del usuario.
     * @return Optional con la criatura si existe.
     */
    public Optional<CreatureResponse> getCreatureByUserId(Long userId) {
        return creatureRepository.findByOwnerId(userId)
                .map(CreatureResponse::new);
    }

    /**
     * Logica de eclosion del huevo.
     * 
     * @param id ID de la criatura.
     * @return Criatura actualizada.
     */
    @Transactional
    public CreatureResponse hatchCreature(Long id) {
        Creature creature = creatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Criatura no encontrada"));

        creature.setHatched(true);
        Creature saved = creatureRepository.save(creature);
        return new CreatureResponse(saved);
    }

    /**
     * Metodo para actualizar estadisticas (puedes llamarlo desde un endpoint de
     * ejercicio).
     * 
     * @param userId ID del usuario.
     * @param steps  Pasos realizados.
     */
    @Transactional
    public void updateStatsBySteps(Long userId, int steps) {
        creatureRepository.findByOwnerId(userId).ifPresent(creature -> {
            // Logica: cada 100 pasos recupera 1 de energia
            int recovery = steps / 100;
            creature.setEnergy(Math.min(100, creature.getEnergy() + recovery));
            creatureRepository.save(creature);
        });
    }
}