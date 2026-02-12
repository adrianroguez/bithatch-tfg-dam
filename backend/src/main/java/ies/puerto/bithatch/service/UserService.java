package ies.puerto.bithatch.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import ies.puerto.bithatch.dto.UserResponse;
import ies.puerto.bithatch.dto.UserUpdateRequest;
import ies.puerto.bithatch.mapper.UserMapper; // <--- Importamos el mapper
import ies.puerto.bithatch.model.entities.User;
import ies.puerto.bithatch.model.enums.Role;
import ies.puerto.bithatch.repository.UserRepository;

/**
 * Servicio para la gestion de usuarios.
 * Realiza operaciones CRUD sobre la entidad User.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper; // <--- Inyectamos el mapper

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    /**
     * Obtiene todos los usuarios y los convierte a DTOs.
     * 
     * @return Lista de UserResponse.
     */
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserResponse) // <--- Usamos el mapper (Method Reference)
                .collect(Collectors.toList());
    }

    /**
     * Busca un usuario por ID.
     * 
     * @param id ID del usuario.
     * @return UserResponse si existe.
     * @throws ies.puerto.bithatch.exception.ResourceNotFoundException Si no existe.
     */
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new ies.puerto.bithatch.exception.ResourceNotFoundException("Usuario no encontrado"));
        return userMapper.toUserResponse(user); // <--- Usamos el mapper
    }

    /**
     * Actualiza un usuario existente.
     * 
     * @param id      ID del usuario.
     * @param request Datos nuevos (email, rol).
     * @return UserResponse con los datos actualizados.
     */
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new ies.puerto.bithatch.exception.ResourceNotFoundException("Usuario no encontrado"));

        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getRole() != null) {
            user.setRole(Role.valueOf(request.getRole()));
        }

        User updatedUser = userRepository.save(user);
        return userMapper.toUserResponse(updatedUser); // <--- Usamos el mapper
    }

    /**
     * Elimina un usuario por ID.
     * 
     * @param id ID del usuario.
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ies.puerto.bithatch.exception.ResourceNotFoundException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }
}