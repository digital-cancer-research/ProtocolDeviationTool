package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_team")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserTeam {

	@Id
	@Column(name = "user_team_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int userTeamId;
	
    @Column(name = "user_id")
    @NotNull
    private int userId;

    @Column(name = "team_id")
    @NotNull
    private int teamId;
}
