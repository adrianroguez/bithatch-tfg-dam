package ies.puerto.bithatch.dto;

import ies.puerto.bithatch.model.enums.EggType;

/**
 * DTO para la solicitud de creacion de una nueva criatura.
 */
public class CreatureCreateRequest {
    private String name;
    private EggType eggType; // Spring convertira automaticamente el String de JSON al Enum

    public CreatureCreateRequest() {
    }

    // --- GETTERS Y SETTERS ---

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public EggType getEggType() {
        return eggType;
    }

    public void setEggType(EggType eggType) {
        this.eggType = eggType;
    }
}