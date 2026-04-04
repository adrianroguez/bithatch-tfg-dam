package ies.puerto.bithatch.mapper;

import ies.puerto.bithatch.dto.UserResponse;
import ies.puerto.bithatch.model.entities.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-04-04T17:49:46+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Ubuntu)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;
        String email = null;
        String role = null;

        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        if ( user.getRole() != null ) {
            role = user.getRole().name();
        }

        boolean hasCreature = user.getCreature() != null;

        UserResponse userResponse = new UserResponse( id, username, email, role, hasCreature );

        return userResponse;
    }
}
