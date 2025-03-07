package org.digitalecmt.qualityassurance.models.mapper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.junit.Test;

public class UserMapperTest {
    @Test
    public void shouldGenerateUserUpdateDtoToUserMethod() {
        UserUpdateDto userDto = UserUpdateDto.builder()
        .id(1L)
        .username("johndoe@example.com")
        .role(Role.USER)
        .isSite(false)
        .isSponsor(false)
        .adminId(2L)
        .dateCreated(LocalDateTime.now())
        .build();
    
        User user = UserMapperImpl.INSTANCE.userUpdateDtoToUser(userDto);

        assertNotNull(user);
        assertEquals(userDto.getId(), user.getId());
        assertEquals(userDto.getUsername(), user.getUsername());
        assertEquals(userDto.getRole(), user.getRole());
        assertEquals(userDto.isSite(), user.getIsSite());
        assertEquals(userDto.isSponsor(), user.getIsSponsor());
        assertEquals(userDto.getDateCreated(), user.getDateCreated());
    }
}
