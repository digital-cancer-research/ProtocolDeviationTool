package org.digitalecmt.qualityassurance.models.dto.User;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Data Transfer Object for updating an existing user.
 * Extends {@link UserCreateDto} to include the user ID.
 * 
 * @see UserCreateDto
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserUpdateDto extends UserCreateDto {

    /**
     * The ID of the user to be updated.
     */
    private Long id;

    private LocalDateTime dateCreated;

    /**
     * Converts this DTO to a User entity.
     * 
     * @return a User entity with the same properties as this DTO.
     */
    @Override
    public User toUser() {
        User user = super.toUser();
        user.setId(id);
        return user;
    }
}
