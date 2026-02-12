package ies.puerto.bithatch.dto;

/**
 * DTO para enviar el token JWT al cliente.
 */
public class AuthResponse {

    /**
     * Token de acceso JWT.
     */
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(String token) {
        this.token = token;
    }

    // --- GETTERS Y SETTERS ---

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}