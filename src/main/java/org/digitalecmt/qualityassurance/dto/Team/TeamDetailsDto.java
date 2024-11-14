package org.digitalecmt.qualityassurance.dto.Team;

import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.repository.UserAccountRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamDetailsDto {
    private Integer teamId;
    private String name;
    private Integer userId;
    private String dateCreated;
    private String username;

    /**
     * Maps a Team entity to a TeamDetailsDto object.
     * 
     * This method creates a new TeamDetailsDto instance using the provided Team
     * entity
     * and fetches the associated username from the UserAccountRepository.
     * 
     * @param team                  The Team entity to be mapped.
     * @param userAccountRepository The repository used to fetch user account
     *                              information.
     * @return A new TeamDetailsDto object containing the mapped team details.
     */
    public static TeamDetailsDto mapToDetailedTeam(Team team, UserAccountRepository userAccountRepository) {
        return TeamDetailsDto.builder()
                .teamId(team.getTeamId())
                .name(team.getTeamName())
                .userId(team.getUserId())
                .dateCreated(team.getDateCreated())
                .username(userAccountRepository.findById(team.getUserId()).orElse(null).getUsername())
                .build();
    }
}
