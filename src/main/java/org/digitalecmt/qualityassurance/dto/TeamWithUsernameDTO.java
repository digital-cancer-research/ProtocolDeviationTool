package org.digitalecmt.qualityassurance.dto;

public class TeamWithUsernameDTO {
    private int teamId;
    private String teamName;
    private String dateCreated;
    private int userId;
    private String username;

    
    // No-argument constructor
    public TeamWithUsernameDTO() {
    }
    
	// Constructor with parameters
    public TeamWithUsernameDTO(int teamId, String teamName, String dateCreated, int userId, String username) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.dateCreated = dateCreated;
        this.userId = userId;
        this.username = username;
    }

    // Getters and setters
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
    
    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
