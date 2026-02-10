package ies.puerto.bithatch.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro de seguridad que intercepta cada peticion HTTP.
 * Se encarga de buscar, extraer y validar el token JWT en la cabecera
 * Authorization.
 * Si el token es valido, establece la autenticacion en el contexto de seguridad
 * de Spring.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Logica principal del filtro.
     * Se ejecuta una vez por cada peticion.
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. Verificacion inicial: Existe la cabecera y empieza por "Bearer "?
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Extraccion del token (eliminando el prefijo "Bearer ")
        jwt = authHeader.substring(7);

        try {
            // 3. Extraccion del usuario desde el token
            userEmail = jwtService.extractUsername(jwt);

            // 4. Si hay usuario y no hay autenticacion previa en el contexto actual
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // Carga los detalles del usuario desde la base de datos
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                // 5. Validacion del token contra el usuario cargado
                if (jwtService.isTokenValid(jwt, userDetails)) {

                    // Creacion del objeto de autenticacion de Spring Security
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());

                    // Aniade detalles de la peticion (IP, Sesion ID, etc.)
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 6. Autorizacion final: Inyecta el usuario en el contexto de seguridad
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // En caso de error (token expirado, firma invalida, malformado),
            // no autenticamos y dejamos pasar la peticion.
            // Si la ruta estaba protegida, Spring Security devolvera 403 Forbidden mas
            // adelante.
            logger.error("No se pudo establecer la autenticacion JWT: " + e.getMessage());
        }

        // Continua con el siguiente filtro en la cadena
        filterChain.doFilter(request, response);
    }
}