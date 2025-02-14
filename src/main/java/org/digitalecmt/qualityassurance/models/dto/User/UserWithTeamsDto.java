package org.digitalecmt.qualityassurance.models.dto.User;

import java.time.LocalDateTime;
import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for a user with their associated teams.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserWithTeamsDto {

    private long id;

    /**
     * The username of the user.
     */
    private String username;

    /**
     * The role of the user.
     */
    private Role role;

    /**
     * Indicates if the user is a site user.
     */
    @JsonProperty("isSite")
    private boolean isSite;

    /**
     * Indicates if the user is a sponsor.
     */
    @JsonProperty("isSponsor")
    private boolean isSponsor;

    /**
     * The list of teams associated with the user.
     */
    List<Team> teams;

    private LocalDateTime dateCreated;

    /**
     * Constructs a UserWithTeamsDto from a User entity and a list of teams.
     * 
     * @param user the User entity
     * @param teams the list of teams associated with the user
     */
    public UserWithTeamsDto(User user, List<Team> teams) {
        this.username = user.getUsername();
        this.role = user.getRole();
        this.isSite = user.getIsSite();
        this.isSponsor = user.getIsSponsor();
        this.teams = teams;
    }
}
