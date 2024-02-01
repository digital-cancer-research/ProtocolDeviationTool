package org.digitalecmt.qualityassurance.dto;

import java.util.List;

public class TeamChangeDTO {
	private int userId;
    private List<Integer> teamId;
    
    // No-argument constructor
    public TeamChangeDTO() {
    }
    
    // Constructor with parameters
    public TeamChangeDTO(int userId, List<Integer> teamId) {
    	this.userId = userId;
    	this.teamId = teamId;
    }
    
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public List<Integer> getTeamId() {
        return teamId;
    }

    public void setTeamId(List<Integer> teamId) {
        this.teamId = teamId;
    }
}
