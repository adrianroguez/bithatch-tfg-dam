package ies.puerto.bithatch.model.enums;

/**
 * Enumerado que define los tipos de huevos disponibles.
 */
public enum EggType {

    /** Huevo tipo A */
    EGG_A("Huevo A (Nombre pendiente)", Personality.KIND),

    /** Huevo tipo B */
    EGG_B("Huevo B (Nombre pendiente)", Personality.NEUTRAL),

    /** Huevo tipo C */
    EGG_C("Huevo C (Nombre pendiente)", Personality.AGGRESSIVE);

    private final String name;
    private final Personality initialPersonality;

    /**
     * Constructor del tipo de huevo.
     * 
     * @param name               Nombre descriptivo del huevo.
     * @param initialPersonality Personalidad asociada.
     */
    EggType(String name, Personality initialPersonality) {
        this.name = name;
        this.initialPersonality = initialPersonality;
    }

    // --- GETTERS ---

    /**
     * Obtiene el nombre del huevo.
     * 
     * @return Nombre.
     */
    public String getName() {
        return name;
    }

    /**
     * Obtiene la personalidad inicial asociada.
     * 
     * @return Personalidad.
     */
    public Personality getInitialPersonality() {
        return initialPersonality;
    }
}
