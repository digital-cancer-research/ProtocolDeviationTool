package org.digitalecmt.qualityassurance.models.dto.User;

import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for creating a new user.
 * 
 * @see User
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserCreateDto {

    private String username;

    private Role role;

    private boolean isSite;

    private boolean isSponsor;

    private Long adminId;
}
