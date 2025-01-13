package org.digitalecmt.qualityassurance.models.mapper;

import org.digitalecmt.qualityassurance.models.dto.User.UserCreateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

/**
 * Mapper interface for converting between {@link User} entities and UserDto classes.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    /**
     * Converts a {@link UserCreateDto} to a {@link User} entity.
     * The 'id' and 'dateCreated' fields in the resulting {@link User} entity will be null.
     *
     * @param user the {@link UserCreateDto} to convert
     * @return the resulting {@link User} entity
     */
    @Mapping(target = "adminId", ignore = true)
    User toUser(UserCreateDto user);

    /**
     * Converts a {@link UserUpdateDto} to a {@link User} entity.
     * The 'id' and 'dateCreated' fields in the resulting {@link User} entity will be null.
     *
     * @param user the {@link UserUpdateDto} to convert
     * @return the resulting {@link User} entity
     */
    @Mapping(target = "adminId", ignore = true)
    User toUser(UserUpdateDto user);
}
