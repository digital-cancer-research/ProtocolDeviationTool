package org.digitalecmt.qualityassurance.dto;


public class RoleChangeDTO {
    private int newRoleId;
    
    // No-argument constructor
    public RoleChangeDTO() {
    }
    
	// Constructor with parameters
    public RoleChangeDTO(int newRoleId) {
    	this.newRoleId = newRoleId;
    }


    public int getNewRoleId() {
        return newRoleId;
    }

    public void setNewRoleId(int newRoleId) {
        this.newRoleId = newRoleId;
    }
}