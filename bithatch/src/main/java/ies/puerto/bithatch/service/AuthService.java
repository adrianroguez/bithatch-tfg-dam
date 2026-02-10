package ies.puerto.bithatch.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ies.puerto.bithatch.dto.AuthResponse;
import ies.puerto.bithatch.dto.LoginRequest;
import ies.puerto.bithatch.dto.RegisterRequest;
import ies.puerto.bithatch.model.Role;
import ies.puerto.bithatch.model.User;
import ies.puerto.bithatch.repository.UserRepository;
import ies.puerto.bithatch.security.JwtService;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Registra un nuevo usuario en el sistema.
     * 1. Verifica que no exista.
     * 2. Crea la entidad.
     * 3. Encripta la contrasenia.
     * 4. Guarda y genera token.
     * 
     * @param request Datos de registro (username, email, password).
     * @return Respuesta con el token JWT.
     */
    public AuthResponse register(RegisterRequest request) {
        // Validacion basica (puedes lanzar excepciones personalizadas aqui)
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya existe");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("El email ya esta registrado");
        }

        // Crear la entidad User (limpia)
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // Importante encriptar!
        user.setRole(Role.USER); // Por defecto todos son USER

        // Guardar en Base de Datos
        userRepository.save(user);

        // Generar Token
        // Como User no es UserDetails, debemos adaptarlo al vuelo para el JwtService
        UserDetails userDetails = mapToUserDetails(user);

        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token);
    }

    /**
     * Autentica un usuario existente.
     * 1. Usa el AuthenticationManager para validar user/pass.
     * 2. Si es correcto, genera el token.
     * 
     * @param request Datos de login (username, password).
     * @return Respuesta con el token JWT.
     */
    public AuthResponse login(LoginRequest request) {
        // Esto autentica contra Spring Security.
        // Si la pass es incorrecta, lanza AuthenticationException automaticamente.
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));

        // Si llegamos aqui, el usuario es valido. Lo buscamos en BD para generar el
        // token.
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Generar Token
        UserDetails userDetails = mapToUserDetails(user);
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token);
    }

    /**
     * Metodo auxiliar (Mapper)
     * Convierte tu entidad 'User' limpia en un 'UserDetails' de Spring Security
     * necesario para generar el token JWT.
     */
    private UserDetails mapToUserDetails(User user) {
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
    }
}