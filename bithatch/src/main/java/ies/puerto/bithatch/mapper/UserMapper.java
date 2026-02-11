package ies.puerto.bithatch.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import ies.puerto.bithatch.dto.UserResponse;
import ies.puerto.bithatch.model.User;

/**
 * Interfaz Mapper para convertir entre Entidades y DTOs.
 * Usa MapStruct para generar la implementacion automaticamente.
 * 
 * componentModel = "spring":
 * Esto le dice a MapStruct que genere una implementacion que sea un Bean de
 * Spring.
 * Asi podras usar @Autowired UserMapper en tu servicio.
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    /**
     * Convierte de Entidad User a DTO UserResponse.
     * MapStruct empareja automaticamente los campos con el mismo nombre
     * (username -> username, email -> email).
     * 
     * @param user Usuario entidad.
     * @return Usuario DTO.
     */
    UserResponse toUserResponse(User user);

    /**
     * Si tuvieras campos con nombres distintos, se haria asi:
     * 
     * @Mapping(source = "nombreReal", target = "username")
     */

    // Tambien puedes definir la lista
    // List<UserResponse> toUserResponseList(List<User> users);
    // (MapStruct genera el bucle automaticamente si defines el metodo individual
    // arriba)
}