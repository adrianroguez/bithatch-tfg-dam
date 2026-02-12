package ies.puerto.bithatch.model.entities;

import java.util.Objects;

import ies.puerto.bithatch.model.enums.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * Entidad User que representa la tabla 'users' en base de datos.
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Creature creature;

    /**
     * Constructor vacio necesario para JPA
     */
    public User() {
    }

    /**
     * Constructor con el campo id
     * 
     * @param id identificador del usuario
     */
    public User(Long id) {
        this.id = id;
    }

    /**
     * Constructor completo con todos los atributos
     * 
     * @param id       identificador unico
     * @param username nombre de usuario
     * @param email    correo electronico
     * @param password contrasenia
     * @param role     rol del usuario
     */
    public User(Long id, String username, String email, String password, Role role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // --- GETTERS Y SETTERS ---

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Creature getCreature() {
        return creature;
    }

    public void setCreature(Creature creature) {
        this.creature = creature;
    }

    // --- EQUALS, HASHCODE TOSTRING ---

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "{" +
                " id='" + getId() + "'" +
                ", username='" + getUsername() + "'" +
                ", email='" + getEmail() + "'" +
                ", password='" + getPassword() + "'" +
                ", role='" + getRole() + "'" +
                "}";
    }
}