package ies.puerto.bithatch.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.puerto.bithatch.dto.CreatureCreateRequest;
import ies.puerto.bithatch.dto.CreatureResponse;
import ies.puerto.bithatch.service.CreatureService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Controlador para la gestion de criaturas (mascotas virtuales).
 */
@RestController
@RequestMapping("/creatures")
@Tag(name = "Gestion de Criaturas", description = "Operaciones relacionadas con el Tamagotchi y su evolucion")
@SecurityRequirement(name = "bearerAuth")
public class CreatureController {

    private final CreatureService creatureService;

    public CreatureController(CreatureService creatureService) {
        this.creatureService = creatureService;
    }

    /**
     * Obtiene la criatura asociada al usuario autenticado.
     * 
     * @param userId ID del usuario (extraido del token).
     * @return Datos de la criatura.
     */
    @Operation(summary = "Obtener criatura propia", description = "Devuelve la criatura asociada al usuario autenticado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Criatura encontrada"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado (Token invalido o expirado)"),
            @ApiResponse(responseCode = "404", description = "El usuario no tiene ninguna criatura")
    })
    @GetMapping("/my")
    public ResponseEntity<CreatureResponse> getMyCreature(@RequestAttribute("userId") Long userId) {
        // Como el service ya devuelve Optional<CreatureResponse>, solo mapeamos a
        // ResponseEntity
        return creatureService.getCreatureByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Crea un starter (huevo) para el usuario.
     * 
     * @param request Datos de creacion (nombre y tipo de huevo).
     * @param userId  ID del usuario.
     * @return La criatura creada.
     */
    @Operation(summary = "Crear starter (Huevo)", description = "Permite elegir el primer huevo para comenzar el juego")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Huevo creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "El usuario ya posee una criatura o datos invalidos"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado")
    })
    @PostMapping("/starter")
    public ResponseEntity<CreatureResponse> createStarter(@RequestBody CreatureCreateRequest request,
            @RequestAttribute("userId") Long userId) {
        // El service ya devuelve CreatureResponse
        return ResponseEntity.ok(creatureService.createStarterFromDto(request, userId));
    }

    /**
     * Eclosiona el huevo de una criatura.
     * 
     * @param id ID de la criatura.
     * @return Criatura con estado eclosionado.
     */
    @Operation(summary = "Eclosionar huevo", description = "Cambia el estado de la criatura de huevo a nacido")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "¡La criatura ha nacido!"),
            @ApiResponse(responseCode = "403", description = "Acceso denegado"),
            @ApiResponse(responseCode = "404", description = "Criatura no encontrada")
    })
    @PutMapping("/{id}/hatch")
    public ResponseEntity<CreatureResponse> hatchCreature(@PathVariable Long id) {
        return ResponseEntity.ok(creatureService.hatchCreature(id));
    }

    /**
     * Lista todas las criaturas (Solo ADMIN).
     * 
     * @return Lista de todas las criaturas.
     */
    @Operation(summary = "Listar todas (Solo ADMIN)", description = "Lista todas las criaturas del sistema para supervision")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Operacion exitosa"),
            @ApiResponse(responseCode = "403", description = "Prohibido: No tienes rol ADMIN")
    })
    @GetMapping
    public ResponseEntity<List<CreatureResponse>> getAllCreatures() {
        return ResponseEntity.ok(creatureService.getAllCreatures());
    }
}