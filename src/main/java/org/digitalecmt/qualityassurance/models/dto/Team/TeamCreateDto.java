package org.digitalecmt.qualityassurance.models.dto.Team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data transfer object for creating a team.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamCreateDto {

    /**
     * The name of the team.
     */
    private String name;

    /**
     * The ID of the admin creating the team.
     */
    private Long adminId;
}
