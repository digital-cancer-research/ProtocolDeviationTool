package org.digitalecmt.qualityassurance.models.dto.Team;

import org.digitalecmt.qualityassurance.models.entities.Team;

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

    /**
     * Converts this DTO to a Team entity.
     * 
     * @return a Team entity with the same properties as this DTO.
     */
    @Override
    public Team toTeam() {
        Team team = super.toTeam();
        team.setId(teamId);
        return team;
    }
}
