package org.digitalecmt.qualityassurance.dto;

import java.util.List;

public class UserWithRoleTeamDTO {
    private String username;
    private List<Integer> teamId;
    private int roleId;

    
    // No-argument constructor
    public UserWithRoleTeamDTO() {
    }
    
	// Constructor with parameters
    public UserWithRoleTeamDTO(String username, List<Integer> teamId, int roleId) {
        this.username = username;
        this.teamId = teamId;
        this.roleId = roleId;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public List<Integer> getTeamId() {
        return teamId;
    }

    public void setTeamId(List<Integer> teamId) {
        this.teamId = teamId;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}
