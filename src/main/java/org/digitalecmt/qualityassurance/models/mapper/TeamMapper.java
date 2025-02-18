package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithStudiesDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TeamMapper {
    TeamMapper INSTANCE = Mappers.getMapper(TeamMapper.class);
    
    @Mapping(target = "studies", ignore = true)
    TeamWithStudiesDto toTeamWithStudiesDto(Team team);
}
