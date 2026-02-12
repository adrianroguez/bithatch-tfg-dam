package ies.puerto.bithatch.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

/**
 * Manejador global de excepciones para la API.
 * Captura excepciones y las convierte en respuestas JSON estandarizadas.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Maneja la excepcion ResourceNotFoundException.
     * Devuelve 404 Not Found.
     * 
     * @param ex      La excepcion capturada.
     * @param request La solicitud web actual.
     * @return ResponseEntity con los detalles del error.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    /**
     * Maneja cualquier otra excepcion no controlada.
     * Devuelve 500 Internal Server Error.
     * 
     * @param ex      La excepcion capturada.
     * @param request La solicitud web actual.
     * @return ResponseEntity con los detalles del error.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex, WebRequest request) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Clase interna para estructurar la respuesta de error.
     */
    public static class ErrorDetails {
        private final Date timestamp;
        private final String message;
        private final String details;

        public ErrorDetails(Date timestamp, String message, String details) {
            this.timestamp = timestamp;
            this.message = message;
            this.details = details;
        }

        public Date getTimestamp() {
            return timestamp;
        }

        public String getMessage() {
            return message;
        }

        public String getDetails() {
            return details;
        }
    }
}
