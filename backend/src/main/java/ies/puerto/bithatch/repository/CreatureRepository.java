package ies.puerto.bithatch.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.puerto.bithatch.model.entities.Creature;

/**
 * Repositorio para acceder a los datos de la entidad Creature.
 */
@Repository
public interface CreatureRepository extends JpaRepository<Creature, Long> {

    /**
     * Busca la criatura asociada a un usuario por su ID de usuario.
     * Util para cargar la mascota en la App tras el login.
     * 
     * @param userId ID del usuario propietario.
     * @return Optional con la criatura si existe.
     */
    Optional<Creature> findByOwnerId(Long userId);

    /**
     * Verifica si un usuario ya tiene una criatura asignada.
     * 
     * @param userId ID del usuario.
     * @return true si ya existe una criatura para ese usuario.
     */
    boolean existsByOwnerId(Long userId);
}
