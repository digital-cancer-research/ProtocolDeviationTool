package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Composite key class for the association between a user and a team.
 * 
 * @see UserTeam
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserTeamId implements Serializable {

    /**
     * The ID of the user.
     */
    private long userId;

    /**
     * The ID of the team.
     */
    private long teamId;
}
