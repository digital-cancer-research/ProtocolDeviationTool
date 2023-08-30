package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private int userId;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "is_site")
    private Boolean isSite;

    @Column(name = "is_sponsor")
    private Boolean isSponsor;

    // Getters and Setters

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

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public Boolean getIsSite() {
        return isSite;
    }

    public void setIsSite(Boolean isSite) {
        this.isSite = isSite;
    }

    public Boolean getIsSponsor() {
        return isSponsor;
    }

    public void setIsSponsor(Boolean isSponsor) {
        this.isSponsor = isSponsor;
    }
}
