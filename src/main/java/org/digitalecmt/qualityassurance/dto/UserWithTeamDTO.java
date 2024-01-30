package org.digitalecmt.qualityassurance.dto;


public class UserWithTeamDTO {
    private int userId;
    private int teamId;
    private String teamName;

    
    // No-argument constructor
    public UserWithTeamDTO() {
    }
    
	// Constructor with parameters
    public UserWithTeamDTO(int userId, int teamId, String teamName) {
        this.userId = userId;
        this.teamId = teamId;
        this.teamName = teamName;
    }

    // Getters and setters
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

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
