package org.digitalecmt.qualityassurance.models.dto.User;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for creating a new user with associated teams.
 * Extends {@link UserCreateDto} to include a list of team IDs.
 * 
 * @see UserCreateDto
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserCreateWithTeamsDto extends UserCreateDto {

    /**
     * The list of team IDs associated with the user.
     */
    private List<Long> teamIds;
}
