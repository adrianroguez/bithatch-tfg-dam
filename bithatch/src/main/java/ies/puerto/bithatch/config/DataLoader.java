package ies.puerto.bithatch.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import ies.puerto.bithatch.model.Role;
import ies.puerto.bithatch.model.User;
import ies.puerto.bithatch.repository.UserRepository;

/**
 * Carga datos iniciales en la base de datos al arrancar la aplicacion.
 * Crea un usuario ADMIN por defecto si no existen usuarios.
 */
@Configuration
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Metodo que se ejecuta al iniciar la aplicacion.
     * Verifica si la base de datos de usuarios esta vacia y crea un admin.
     * 
     * @param args Argumentos de linea de comandos.
     * @throws Exception Si ocurre un error durante la ejecucion.
     */
    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setEmail("admin@bithatch.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
            System.out.println("Usuario ADMIN creado por defecto: admin / admin123");
        }
    }
}
