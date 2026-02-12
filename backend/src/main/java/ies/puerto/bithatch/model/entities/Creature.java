package ies.puerto.bithatch.model.entities;

import java.time.LocalDateTime;
import java.util.Objects;

import ies.puerto.bithatch.model.enums.EggType;
import ies.puerto.bithatch.model.enums.Personality;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

/**
 * Entidad que representa la mascota virtual en el sistema.
 * Gestiona el estado, estadisticas y relacion con el usuario.
 */
@Entity
@Table(name = "creatures")
public class Creature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EggType eggType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Personality personality;

    // Estadisticas basicas
    private int level = 1;
    private int experience = 0;
    private int energy = 100;
    private int happiness = 100;

    // Logica de juego
    private boolean isHatched = false;
    private LocalDateTime lastInteraction;

    // Relacion con el usuario (Cada usuario tiene una criatura)
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    private User owner;

    /**
     * Constructor vacio requerido por JPA.
     */
    public Creature() {
        this.lastInteraction = LocalDateTime.now();
    }

    /**
     * Constructor para inicializar una criatura a partir de un huevo.
     * 
     * @param name    Nombre de la criatura.
     * @param eggType Tipo de huevo seleccionado.
     * @param owner   Usuario propietario de la criatura.
     */
    public Creature(String name, EggType eggType, User owner) {
        this.name = name;
        this.eggType = eggType;
        this.owner = owner;
        // La personalidad inicial se hereda del huevo elegido
        this.personality = eggType.getInitialPersonality();
        this.lastInteraction = LocalDateTime.now();
        this.isHatched = false; // Empieza como huevo
    }

    // --- GETTERS Y SETTERS ---

    /**
     * Obtiene el ID de la criatura.
     * 
     * @return ID unico.
     */
    public Long getId() {
        return id;
    }

    /**
     * Establece el ID de la criatura.
     * 
     * @param id ID unico.
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Obtiene el nombre de la criatura.
     * 
     * @return Nombre de la criatura.
     */
    public String getName() {
        return name;
    }

    /**
     * Establece el nombre de la criatura.
     * 
     * @param name Nuevo nombre.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Obtiene el tipo de huevo del que nacio.
     * 
     * @return Tipo de huevo.
     */
    public EggType getEggType() {
        return eggType;
    }

    /**
     * Establece el tipo de huevo.
     * 
     * @param eggType Tipo de huevo.
     */
    public void setEggType(EggType eggType) {
        this.eggType = eggType;
    }

    /**
     * Obtiene la personalidad de la criatura.
     * 
     * @return Personalidad actual.
     */
    public Personality getPersonality() {
        return personality;
    }

    /**
     * Establece la personalidad de la criatura.
     * 
     * @param personality Nueva personalidad.
     */
    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    /**
     * Obtiene el nivel actual.
     * 
     * @return Nivel.
     */
    public int getLevel() {
        return level;
    }

    /**
     * Establece el nivel actual.
     * 
     * @param level Nuevo nivel.
     */
    public void setLevel(int level) {
        this.level = level;
    }

    /**
     * Obtiene la experiencia acumulada.
     * 
     * @return Puntos de experiencia.
     */
    public int getExperience() {
        return experience;
    }

    /**
     * Establece la experiencia acumulada.
     * 
     * @param experience Puntos de experiencia.
     */
    public void setExperience(int experience) {
        this.experience = experience;
    }

    /**
     * Obtiene la energia actual (0-100).
     * 
     * @return Energia.
     */
    public int getEnergy() {
        return energy;
    }

    /**
     * Establece la energia actual.
     * 
     * @param energy Energia (0-100).
     */
    public void setEnergy(int energy) {
        this.energy = energy;
    }

    /**
     * Obtiene la felicidad actual (0-100).
     * 
     * @return Felicidad.
     */
    public int getHappiness() {
        return happiness;
    }

    /**
     * Establece la felicidad actual.
     * 
     * @param happiness Felicidad (0-100).
     */
    public void setHappiness(int happiness) {
        this.happiness = happiness;
    }

    /**
     * Indica si la criatura ha eclosionado del huevo.
     * 
     * @return true si ha nacido, false si es huevo.
     */
    public boolean isHatched() {
        return isHatched;
    }

    /**
     * Establece el estado de eclosion.
     * 
     * @param hatched true para nacer, false para huevo.
     */
    public void setHatched(boolean hatched) {
        isHatched = hatched;
    }

    /**
     * Obtiene la fecha y hora de la ultima interaccion.
     * 
     * @return Fecha/Hora.
     */
    public LocalDateTime getLastInteraction() {
        return lastInteraction;
    }

    /**
     * Establece la fecha y hora de la ultima interaccion.
     * 
     * @param lastInteraction Fecha/Hora.
     */
    public void setLastInteraction(LocalDateTime lastInteraction) {
        this.lastInteraction = lastInteraction;
    }

    /**
     * Obtiene el usuario propietario.
     * 
     * @return Usuario.
     */
    public User getOwner() {
        return owner;
    }

    /**
     * Establece el usuario propietario.
     * 
     * @param owner Usuario.
     */
    public void setOwner(User owner) {
        this.owner = owner;
    }

    // --- METODOS DE APOYO (EQUALS, HASHCODE, TOSTRING) ---

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Creature creature = (Creature) o;
        return Objects.equals(id, creature.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Creature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", eggType=" + eggType +
                ", personality=" + personality +
                ", level=" + level +
                ", owner=" + (owner != null ? owner.getUsername() : "null") +
                '}';
    }
}
