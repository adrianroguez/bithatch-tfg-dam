package ies.puerto.bithatch.exception;

/**
 * Excepcion personalizada para recursos no encontrados (404).
 */
public class ResourceNotFoundException extends RuntimeException {
    /**
     * Constructor con mensaje.
     * 
     * @param message Detalle del error.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
