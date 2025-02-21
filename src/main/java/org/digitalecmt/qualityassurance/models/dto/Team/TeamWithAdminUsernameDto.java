package org.digitalecmt.qualityassurance.models.dto.Team;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for a team with the admin's username.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamWithAdminUsernameDto {

    /**
     * The unique identifier for the team.
     */
    private Long id;

    /**
     * The name of the team.
     */
    private String name;

    /**
     * The ID of the user associated with the team.
     */
    private Long createdBy;

    /**
     * The date the team was created.
     */
    private LocalDateTime dateCreated;

    /**
     * The username of the admin who created the team.
     */
    private String username;
}
