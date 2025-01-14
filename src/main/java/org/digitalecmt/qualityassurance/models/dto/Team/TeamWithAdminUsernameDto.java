package org.digitalecmt.qualityassurance.models.dto.Team;

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
    private Long teamId;

    /**
     * The name of the team.
     */
    private String teamName;

    /**
     * The ID of the user associated with the team.
     */
    private Integer userId;

    /**
     * The date the team was created.
     */
    private String dateCreated;

    /**
     * The username of the admin who created the team.
     */
    private String createdBy;
}
