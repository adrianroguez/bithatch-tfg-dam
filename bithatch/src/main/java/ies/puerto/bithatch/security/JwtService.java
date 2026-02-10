package ies.puerto.bithatch.security;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Servicio encargado de la gestion integral de JSON Web Tokens (JWT).
 * Maneja la creacion, firma y validacion criptografica de los tokens de acceso.
 */
@Service
public class JwtService {

    private final SecretKey key;
    private final long expirationSeconds;

    /**
     * Constructor del servicio.
     * Inicializa la clave criptografica y el tiempo de expiracion desde la
     * configuracion.
     *
     * @param base64Secret      Clave secreta en formato Base64 (definida en
     *                          properties).
     * @param expirationSeconds Tiempo de vida del token en segundos.
     */
    public JwtService(
            @Value("${app.jwt.secret}") String base64Secret,
            @Value("${app.jwt.expiration-seconds:3600}") long expirationSeconds) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(base64Secret));
        this.expirationSeconds = expirationSeconds;
    }

    /**
     * Genera un nuevo token JWT para un usuario autenticado.
     * Incorpora automaticamente los roles del usuario en el payload (claims).
     *
     * @param user Detalles del usuario autenticado (UserDetails).
     * @return String con el token JWT firmado.
     */
    public String generateToken(UserDetails user) {
        Instant now = Instant.now();

        // Extrae los roles (authorities) para incluirlos en el token
        List<String> roles = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return Jwts.builder()
                .subject(user.getUsername())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(expirationSeconds)))
                .claim("roles", roles)
                .signWith(key)
                .compact();
    }

    /**
     * Extrae el nombre de usuario (subject) contenido en un token.
     *
     * @param token Token JWT a analizar.
     * @return Nombre de usuario (generalmente el email).
     */
    public String extractUsername(String token) {
        return parseAllClaims(token).getSubject();
    }

    /**
     * Verifica la validez tecnica y logica de un token.
     * Comprueba la firma criptografica, la expiracion y que pertenezca al usuario
     * indicado.
     *
     * @param token Token JWT.
     * @param user  Detalles del usuario contra el que se valida.
     * @return true si el token es valido y activo; false en caso contrario.
     */
    public boolean isTokenValid(String token, UserDetails user) {
        final String username = extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Comprueba si la fecha de expiracion del token ha pasado.
     *
     * @param token Token JWT.
     * @return true si el token ha caducado.
     */
    private boolean isTokenExpired(String token) {
        return parseAllClaims(token).getExpiration().before(new Date());
    }

    /**
     * Parsea y verifica la firma del token para obtener sus datos (payload).
     *
     * @param token Token JWT.
     * @return Objeto Claims con la informacion del token.
     * @throws io.jsonwebtoken.JwtException si el token es invalido o la firma no
     *                                      coincide.
     */
    private Claims parseAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}