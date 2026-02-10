package ies.puerto.bithatch.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import ies.puerto.bithatch.security.JwtAuthenticationFilter;

/**
 * Configuracion de la seguridad HTTP y las reglas de autorizacion.
 * Define la cadena de filtros (SecurityFilterChain) que intercepta las
 * peticiones.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter, AuthenticationProvider authenticationProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
    }

    /**
     * Configura la cadena de filtros de seguridad.
     * Establece las politicas de CSRF, sesion y rutas permitidas.
     *
     * @param http Objeto HttpSecurity para configurar la seguridad web.
     * @return SecurityFilterChain construida.
     * @throws Exception Si ocurre un error en la configuracion.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Deshabilita CSRF ya que usamos tokens JWT y no cookies de sesion
                .csrf(csrf -> csrf.disable())

                // Gestion de autorizacion de rutas
                .authorizeHttpRequests(auth -> auth
                        // Permite acceso publico a los endpoints de autenticacion
                        .requestMatchers("/auth/**").permitAll()

                        // Permite acceso publico a la documentacion de la API (Swagger/OpenAPI)
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        // Permite acceso a la consola H2 (solo entorno de desarrollo)
                        .requestMatchers("/h2-console/**").permitAll()

                        // Requiere autenticacion para cualquier otra peticion
                        .anyRequest().authenticated())

                // Configura la gestion de sesiones como STATELESS (sin estado)
                // Cada peticion debe incluir el token, no se guarda sesion en el servidor
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Establece el proveedor de autenticacion personalizado
                .authenticationProvider(authenticationProvider)

                // Aniade el filtro JWT antes del filtro estandar de usuario/contrasenia
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}