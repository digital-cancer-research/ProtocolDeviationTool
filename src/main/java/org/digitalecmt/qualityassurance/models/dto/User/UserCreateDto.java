package org.digitalecmt.qualityassurance.models.dto.User;

import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Data Transfer Object for creating a new user.
 * 
 * @see User
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class UserCreateDto {

    private String username;

    private Role role;

    @JsonProperty("isSite")
    private boolean isSite;

    @JsonProperty("isSponsor")
    private boolean isSponsor;

    private Long adminId;

    /**
     * Converts this DTO to a User entity.
     * 
     * @return a User entity with the same properties as this DTO.
     */
    public User toUser() {
        return User.builder()
                .username(username)
                .role(role)
                .isSite(isSite)
                .isSponsor(isSponsor)
                .build();
    }
}
