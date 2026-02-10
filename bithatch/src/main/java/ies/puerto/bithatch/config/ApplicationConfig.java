package ies.puerto.bithatch.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import ies.puerto.bithatch.repository.UserRepository;

@Configuration
public class ApplicationConfig {

    private final UserRepository repository;

    public ApplicationConfig(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Bean que configura el UserDetailsService.
     * Busca el usuario en la base de datos y lo convierte a un objeto UserDetails
     * de Spring Security.
     * 
     * @return Implementacion de UserDetailsService.
     * @throws UsernameNotFoundException Si no se encuentra el usuario.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByUsername(username)
                .map(usuarioDb -> {
                    // Convertimos el rol del usuario a una autoridad de Spring Security
                    var authorities = List.of(new SimpleGrantedAuthority(usuarioDb.getRole().name()));

                    // Retornamos el objeto User de Spring Security con las credenciales y
                    // autoridades
                    return new org.springframework.security.core.userdetails.User(
                            usuarioDb.getUsername(),
                            usuarioDb.getPassword(),
                            authorities);
                })
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    }

    /**
     * Bean que configura el AuthenticationProvider.
     * Utiliza DaoAuthenticationProvider para autenticar usuarios basados en base de
     * datos.
     * 
     * @return Instancia de AuthenticationProvider configurada.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Bean que expone el AuthenticationManager.
     * Necesario para procesar las solicitudes de autenticacion.
     * 
     * @param config Configuracion de autenticacion de Spring.
     * @return Instancia de AuthenticationManager.
     * @throws Exception Si ocurre un error al obtener el manager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Bean que configura el codificador de contraseñas.
     * Utiliza BCrypt para hashing seguro.
     * 
     * @return Instancia de BCryptPasswordEncoder.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}