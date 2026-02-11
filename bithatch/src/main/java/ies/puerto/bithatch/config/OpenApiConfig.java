package ies.puerto.bithatch.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

/**
 * Configuracion de OpenAPI (Swagger).
 * Define la informacion general de la API.
 */
@Configuration
@OpenAPIDefinition(info = @Info(title = "BitHatch API", version = "1.0", description = "Documentacion de la API para el proyecto BitHatch (TFG)"))
@SecurityScheme(name = "bearerAuth", description = "Autenticacion JWT", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER)
public class OpenApiConfig {
}