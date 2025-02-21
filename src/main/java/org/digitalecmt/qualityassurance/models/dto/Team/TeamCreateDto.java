package org.digitalecmt.qualityassurance.models.dto.Team;

import org.digitalecmt.qualityassurance.models.entities.Team;

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

    /**
     * Converts this DTO to a Team entity.
     * 
     * @return a Team entity with the same properties as this DTO.
     */
    public Team toTeam() {
        return Team.builder()
                .name(name)
                .createdBy(adminId)
                .build();
    }
}
