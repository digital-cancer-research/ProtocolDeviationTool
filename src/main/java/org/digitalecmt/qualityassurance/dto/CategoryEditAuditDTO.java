package org.digitalecmt.qualityassurance.dto;

import java.time.LocalDateTime;

public class CategoryEditAuditDTO {
    private int categoryEditAuditId;
    private String changeFromTo;
    private String username;
    private LocalDateTime dateTimeEdited;

    // No-argument constructor
    public CategoryEditAuditDTO() {
    }

    // Constructor with parameters
    public CategoryEditAuditDTO(int categoryEditAuditId, String changeFromTo, String username, LocalDateTime dateTimeEdited) {
        this.categoryEditAuditId = categoryEditAuditId;
        this.changeFromTo = changeFromTo;
        this.username = username;
        this.dateTimeEdited = dateTimeEdited;
    }

    // Getters and setters
    public int getCategoryEditAuditId() {
        return categoryEditAuditId;
    }

    public void setCategoryEditAuditId(int categoryEditAuditId) {
        this.categoryEditAuditId = categoryEditAuditId;
    }

    public String getChangeFromTo() {
        return changeFromTo;
    }

    public void setChangeFromTo(String changeFromTo) {
        this.changeFromTo = changeFromTo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getDateTimeEdited() {
        return dateTimeEdited;
    }

    public void setDateTimeEdited(LocalDateTime dateTimeEdited) {
        this.dateTimeEdited = dateTimeEdited;
    }
}
