package ies.puerto.bithatch.dto;

/**
 * DTO para los datos de registro de un nuevo usuario.
 */
public class RegisterRequest {

    /** Nombre de usuario unico */
    private String username;

    /** Correo electronico valido */
    private String email;

    /** Contrasenia segura */
    private String password;

    public RegisterRequest() {
    }

    public RegisterRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}