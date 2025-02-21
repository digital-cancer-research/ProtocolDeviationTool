package org.digitalecmt.qualityassurance.models.dto.User;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for updating an existing user with associated teams.
 * Extends {@link UserUpdateDto} to include a list of team IDs.
 * 
 * @see UserUpdateDto
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateWithTeamsDto extends UserUpdateDto {

    /**
     * The list of team IDs associated with the user.
     */
    private List<Long> teamIds;
}
