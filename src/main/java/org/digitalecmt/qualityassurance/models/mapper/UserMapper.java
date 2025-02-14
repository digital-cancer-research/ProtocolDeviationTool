package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.User.UserWithTeamsDto;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    UserWithTeamsDto toUserWithTeamsDto(User user);
}
