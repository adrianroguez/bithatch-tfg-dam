package ies.puerto.bithatch.dto;

/**
 * DTO para la solicitud de actualizacion de usuario.
 * Permite modificar email y rol.
 */
public class UserUpdateRequest {
    /** Nuevo correo electronico (opcional) */
    private String email;
    /** Nuevo rol (opcional) */
    private String role;

    public UserUpdateRequest() {
    }

    // --- GETTERS Y SETTERS ---

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}