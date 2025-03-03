package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserWithTeamsDto;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    @Mapping(target = "teams", ignore = true)
    UserWithTeamsDto toUserWithTeamsDto(User user);

    @Mapping(target = "isSite", source = "site")
    @Mapping(target = "isSponsor", source = "sponsor")
    User userUpdateDtoToUser(UserUpdateDto user);
}
