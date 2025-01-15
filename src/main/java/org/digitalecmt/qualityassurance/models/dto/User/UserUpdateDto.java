package org.digitalecmt.qualityassurance.models.dto.User;

import org.digitalecmt.qualityassurance.models.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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
public class UserUpdateDto extends UserCreateDto {

    /**
     * The ID of the user to be updated.
     */
    private Long userId;

    /**
     * Converts this DTO to a User entity.
     * 
     * @return a User entity with the same properties as this DTO.
     */
    @Override
    public User toUser() {
        User user = super.toUser();
        user.setId(userId);
        return user;
    }
}
