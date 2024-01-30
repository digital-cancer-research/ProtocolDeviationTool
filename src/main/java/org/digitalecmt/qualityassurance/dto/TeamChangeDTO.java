package org.digitalecmt.qualityassurance.dto;

import java.util.List;

public class TeamChangeDTO {
    private List<Integer> newTeamIds;
    
    // No-argument constructor
    public TeamChangeDTO() {
    }
    
    // Constructor with parameters
    public TeamChangeDTO(List<Integer> newTeamIds) {
        this.newTeamIds = newTeamIds;
    }

    public List<Integer> getNewTeamIds() {
        return newTeamIds;
    }

    public void setNewTeamIds(List<Integer> newTeamIds) {
        this.newTeamIds = newTeamIds;
    }
}
