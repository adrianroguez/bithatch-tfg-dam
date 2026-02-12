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
 * Clase de configuracion de seguridad de Spring Security.
 * Define la cadena de filtros, gestion de sesiones y reglas de autorizacion.
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
         * 
         * @param http Objeto HttpSecurity para configurar la seguridad web.
         * @return La cadena de filtros configurada.
         * @throws Exception Si ocurre un error en la configuracion.
         */
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                // 1. Deshabilitar CSRF (estandar en APIs REST con JWT)
                                .csrf(csrf -> csrf.disable())

                                // 2. CRITICO PARA H2: Permitir que la web use Frames (marcos)
                                // Si no pones esto, H2 Console no cargara nunca.
                                .headers(headers -> headers.frameOptions(frame -> frame.disable()))

                                // 3. Gestion de Rutas
                                .authorizeHttpRequests(auth -> auth
                                                // Rutas de Autenticacion (Login/Register)
                                                // Importante: Tu AuthController usa "/auth", asi que permitimos eso.
                                                .requestMatchers("/auth/**").permitAll()

                                                // Documentacion Swagger / OpenAPI
                                                .requestMatchers(
                                                                "/v3/api-docs/**",
                                                                "/swagger-ui/**",
                                                                "/swagger-ui.html")
                                                .permitAll()

                                                // Consola de Base de Datos H2
                                                .requestMatchers("/h2-console/**").permitAll()

                                                // Rutas protegidas solo para ADMIN
                                                .requestMatchers("/users/**").hasRole("ADMIN")

                                                // Todo lo demas requiere estar logueado (Token valido)
                                                .anyRequest().authenticated())

                                // 4. Gestion de Sesion (Stateless = Sin estado)
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                                // 5. Providers y Filtros
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}