package ies.puerto.bithatch.controller;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.puerto.bithatch.service.OllamaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controlador que expone el endpoint de chat con la IA (Ollama / goosedev-luna).
 * Requiere autenticacion JWT.
 */
@RestController
@RequestMapping("/ai")
@Tag(name = "IA - Chat", description = "Endpoint para interactuar con la criatura via IA")
public class AiController {

    private final OllamaService ollamaService;

    public AiController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    /**
     * Envia un mensaje al modelo de IA y recibe la respuesta de la criatura.
     *
     * @param request   DTO con el campo "message".
     * @param principal Usuario autenticado (extraido del JWT por Spring Security).
     * @return DTO con el campo "reply" con la respuesta generada.
     */
    @Operation(
            summary = "Chat con la criatura via IA",
            description = "Envia un mensaje y recibe una respuesta generada por goosedev/luna usando el contexto de tu criatura",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Respuesta generada correctamente"),
            @ApiResponse(responseCode = "401", description = "Token JWT no valido o ausente"),
            @ApiResponse(responseCode = "503", description = "Ollama no disponible")
    })
    @PostMapping("/chat")
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request, Principal principal) {
        String reply = ollamaService.chat(principal.getName(), request.message());
        return ResponseEntity.ok(new ChatResponse(reply));
    }

    // ── Records de Request / Response ────────────────────────────────────────

    /**
     * DTO de entrada para el endpoint de chat.
     *
     * @param message Mensaje enviado por el usuario.
     */
    public record ChatRequest(String message) {}

    /**
     * DTO de salida del endpoint de chat.
     *
     * @param reply Respuesta generada por el modelo de IA.
     */
    public record ChatResponse(String reply) {}
}
