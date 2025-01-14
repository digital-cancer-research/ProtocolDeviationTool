package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.Team.TeamCreateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

/**
 * Mapper interface for converting between {@link Team} entities and {@link TeamWithAdminUsernameDto} data transfer objects.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TeamMapper {

    /**
     * Converts a {@link TeamCreateDto} to a {@link Team} entity.
     *
     * @param team the {@link TeamCreateDto} to convert
     * @return the resulting {@link Team} entity
     */
    Team toTeam(TeamCreateDto team);

    /**
     * Converts a {@link TeamUpdateDto} to a {@link Team} entity.
     *
     * @param team the {@link TeamUpdateDto} to convert
     * @return the resulting {@link Team} entity
     */
    Team toTeam(TeamUpdateDto team);

    /**
     * Converts a {@link Team} entity to a {@link TeamWithAdminUsernameDto}.
     * The 'createdBy' field in the resulting {@link TeamWithAdminUsernameDto} will be ignored.
     *
     * @param team the {@link Team} entity to convert
     * @return the resulting {@link TeamWithAdminUsernameDto}
     */
    @Mapping(target = "createdBy", ignore = true)
    TeamWithAdminUsernameDto toTeamWithAdminUsernameDto(Team team);
}
