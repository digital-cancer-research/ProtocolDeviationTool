package org.digitalecmt.qualityassurance.dto;


public class UserWithRoleDTO {
    private int userId;
    private String username;
    private String dateCreated;
    private int roleId;
    private String roleName;

    
    // No-argument constructor
    public UserWithRoleDTO() {
    }
    
	// Constructor with parameters
    public UserWithRoleDTO(int userId, String username, String dateCreated, int roleId, String roleName) {
        this.userId = userId;
        this.username = username;
        this.dateCreated = dateCreated;
        this.roleId = roleId;
        this.roleName = roleName;
    }

    // Getters and setters
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
    
    public String getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
