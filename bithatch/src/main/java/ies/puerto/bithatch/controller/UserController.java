package ies.puerto.bithatch.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.puerto.bithatch.dto.UserResponse;
import ies.puerto.bithatch.dto.UserUpdateRequest;
import ies.puerto.bithatch.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/users")
@Tag(name = "Gestion de Usuarios", description = "CRUD de usuarios (Requiere ROL ADMIN)")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Obtiene todos los usuarios.
     * 
     * @return Lista de usuarios.
     */
    @Operation(summary = "Listar todos los usuarios", description = "Devuelve una lista con todos los usuarios registrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de usuarios recuperada exitosamente"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado (Requiere ser ADMIN)")
    })
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    /**
     * Obtiene un usuario por ID.
     * 
     * @param id ID del usuario.
     * @return Usuario encontrado.
     */
    @Operation(summary = "Obtener usuario por ID", description = "Busca un usuario especifico por su identificador unico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado (Requiere ser ADMIN)"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    /**
     * Actualiza un usuario.
     * 
     * @param id      ID del usuario.
     * @param request Datos a actualizar.
     * @return Usuario actualizado.
     */
    @Operation(summary = "Actualizar usuario", description = "Modifica datos (email o rol) de un usuario existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario actualizado correctamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos en la solicitud"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado (Requiere ser ADMIN)"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    /**
     * Elimina un usuario.
     * 
     * @param id ID del usuario.
     * @return Respuesta vacia.
     */
    @Operation(summary = "Eliminar usuario", description = "Borra permanentemente un usuario de la base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Usuario eliminado correctamente (Sin contenido)"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado (Requiere ser ADMIN)"),
            @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}