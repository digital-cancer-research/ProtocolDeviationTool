package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_team")
public class UserTeam {

	@Id
	@Column(name = "user_team_id")
	@SequenceGenerator(initialValue=1, name="user_team_seq", sequenceName="user_team_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_team_seq")
    private int userTeamId;
	
    @Column(name = "user_id")
    private int userId;

    @Column(name = "team_id")
    private int teamId;

    // Getters and Setters

    public int getUserTeamId() {
        return userTeamId;
    }

    public void setUserTeamId(int userTeamId) {
        this.userTeamId = userTeamId;
    }
    
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }
}
