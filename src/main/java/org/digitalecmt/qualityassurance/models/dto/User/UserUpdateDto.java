package org.digitalecmt.qualityassurance.models.dto.User;

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

    private Long userId;
}
