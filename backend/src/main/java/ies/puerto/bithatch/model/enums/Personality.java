package ies.puerto.bithatch.model.enums;

/**
 * Enumerado que define las personalidades de las criaturas.
 */
public enum Personality {

    /** Personalidad Amable */
    KIND("Personalidad A (Nombre pendiente)", "Intrucciones para la ia (Pendiente de implementar)"),

    /** Personalidad Neutral */
    NEUTRAL("Personalidad A (Nombre pendiente)", "Intrucciones para la ia (Pendiente de implementar)"),

    /** Personalidad Agresiva */
    AGGRESSIVE("Personalidad A (Nombre pendiente)", "Intrucciones para la ia (Pendiente de implementar)");

    private final String label;
    private final String aiInstruction;

    /**
     * Constructor de la personalidad.
     * 
     * @param label         Etiqueta legible.
     * @param aiInstruction Instrucciones para la IA (comportamiento).
     */
    Personality(String label, String aiInstruction) {
        this.label = label;
        this.aiInstruction = aiInstruction;
    }

    // --- GETTERS ---

    /**
     * Obtiene la etiqueta de la personalidad.
     * 
     * @return Etiqueta.
     */
    public String getLabel() {
        return label;
    }

    /**
     * Obtiene las instrucciones de comportamiento para la IA.
     * 
     * @return Instrucciones de IA.
     */
    public String getAiInstruction() {
        return aiInstruction;
    }
}
