package ies.puerto.bithatch.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.puerto.bithatch.model.User;

/**
 * Repositorio para la gestion de usuarios en la base de datos
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Busca un usuario por su nombre de usuario.
     * 
     * @param username Nombre de usuario a buscar.
     * @return Optional con el usuario si existe.
     */
    Optional<User> findByUsername(String username);

    /**
     * Verifica si existe un usuario con el nombre de usuario dado.
     * 
     * @param username Nombre de usuario.
     * @return true si existe, false en caso contrario.
     */
    boolean existsByUsername(String username);

    /**
     * Verifica si existe un usuario con el email dado.
     * 
     * @param email Correo electronico.
     * @return true si existe, false en caso contrario.
     */
    boolean existsByEmail(String email);
}