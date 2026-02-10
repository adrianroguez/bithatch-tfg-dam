package ies.puerto.bithatch.dto;

/**
 * DTO para las credenciales de inicio de sesion.
 */
public class LoginRequest {

    /** Nombre de usuario */
    private String username;

    /** Contrasenia del usuario */
    private String password;

    public LoginRequest() {
    }

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}