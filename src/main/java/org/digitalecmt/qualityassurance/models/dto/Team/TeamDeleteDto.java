package org.digitalecmt.qualityassurance.models.dto.Team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data transfer object for deleting a team.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeamDeleteDto {

    /**
     * The ID of the admin performing the deletion.
     */
    private Long adminId;

    /**
     * The ID of the team to be deleted.
     */
    private Long teamId;
}
