package org.digitalecmt.qualityassurance.models.dto.Team;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Data transfer object for updating a team.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class TeamUpdateDto extends TeamCreateDto {

    /**
     * The unique identifier of the team.
     */
    private Long teamId;
}
