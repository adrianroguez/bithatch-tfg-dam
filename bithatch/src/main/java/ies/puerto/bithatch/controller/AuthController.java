package ies.puerto.bithatch.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.puerto.bithatch.dto.AuthResponse;
import ies.puerto.bithatch.dto.LoginRequest;
import ies.puerto.bithatch.dto.RegisterRequest;
import ies.puerto.bithatch.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/auth")
@Tag(name = "Autenticacion", description = "Endpoints para registro e inicio de sesion")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Endpoint para registrar un nuevo usuario.
     * 
     * @param request Datos de registro (username, email, password).
     * @return Respuesta con el token JWT si es exitoso.
     */
    @Operation(summary = "Registrar nuevo usuario", description = "Crea una cuenta y devuelve un token JWT de acceso")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Usuario registrado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos invalidos o usuario ya existente (Username/Email duplicado)")
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Endpoint para iniciar sesion.
     * 
     * @param request Datos de acceso (username, password).
     * @return Respuesta con el token JWT si las credenciales son correctas.
     */
    @Operation(summary = "Iniciar sesion", description = "Valida las credenciales y devuelve un token JWT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Inicio de sesion exitoso"),
            @ApiResponse(responseCode = "403", description = "Credenciales incorrectas (Usuario o contrasenia no validos)")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}