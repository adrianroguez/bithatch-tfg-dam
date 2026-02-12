package ies.puerto.bithatch.dto;

import java.time.LocalDateTime;

import ies.puerto.bithatch.model.entities.Creature;

/**
 * DTO para enviar informacion de la criatura al cliente.
 */
public class CreatureResponse {
    private Long id;
    private String name;
    private String eggType; // Enviamos el nombre del Enum
    private String personality; // Enviamos el nombre del Enum
    private int level;
    private int experience;
    private int energy;
    private int happiness;
    private boolean isHatched;
    private String ownerUsername; // Solo el nombre, por seguridad
    private LocalDateTime lastInteraction;

    public CreatureResponse() {
    }

    /**
     * Constructor de conversion: Transforma Entidad -> DTO.
     * 
     * @param creature Entidad Creature de origen.
     */
    public CreatureResponse(Creature creature) {
        this.id = creature.getId();
        this.name = creature.getName();
        this.eggType = creature.getEggType().name();
        this.personality = creature.getPersonality().name();
        this.level = creature.getLevel();
        this.experience = creature.getExperience();
        this.energy = creature.getEnergy();
        this.happiness = creature.getHappiness();
        this.isHatched = creature.isHatched();
        this.lastInteraction = creature.getLastInteraction();
        if (creature.getOwner() != null) {
            this.ownerUsername = creature.getOwner().getUsername();
        }
    }

    // --- GETTERS Y SETTERS ---
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEggType() {
        return eggType;
    }

    public void setEggType(String eggType) {
        this.eggType = eggType;
    }

    public String getPersonality() {
        return personality;
    }

    public void setPersonality(String personality) {
        this.personality = personality;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public int getEnergy() {
        return energy;
    }

    public void setEnergy(int energy) {
        this.energy = energy;
    }

    public int getHappiness() {
        return happiness;
    }

    public void setHappiness(int happiness) {
        this.happiness = happiness;
    }

    public boolean isHatched() {
        return isHatched;
    }

    public void setHatched(boolean hatched) {
        isHatched = hatched;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public LocalDateTime getLastInteraction() {
        return lastInteraction;
    }

    public void setLastInteraction(LocalDateTime lastInteraction) {
        this.lastInteraction = lastInteraction;
    }
}