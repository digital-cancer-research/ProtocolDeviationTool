package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing the association between a user and a team.
 * 
 * @see UserTeamId
 */
@Entity
@Table(name = "user_team")
@IdClass(UserTeamId.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTeam {

    /**
     * The ID of the user.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "user_id")
    private long userId;

    /**
     * The ID of the team.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "team_id")
    private long teamId;
}
