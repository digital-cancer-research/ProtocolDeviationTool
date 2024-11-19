package org.digitalecmt.qualityassurance.dto.Team;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.digitalecmt.qualityassurance.model.persistence.Team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamCreationDto {
    private String name;
    private Integer userId;

    /**
     * Maps a {@link TeamCreationDto} object to a {@link Team} object.
     *
     * @param teamDto The {@link TeamCreationDto} object to be mapped.
     * @return A {@link Team} object created from the provided
     *         {@link TeamCreationDto}.
     *
     * @throws NullPointerException If the provided {@link TeamCreationDto} is null.
     */
    public static Team mapper(TeamCreationDto teamDto) {
        String date = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        return Team.builder()
                .teamName(teamDto.getName())
                .userId(teamDto.getUserId())
                .dateCreated(date)
                .build();
    }
}
