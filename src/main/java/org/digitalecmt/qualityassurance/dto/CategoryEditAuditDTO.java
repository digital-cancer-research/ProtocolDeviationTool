package org.digitalecmt.qualityassurance.dto;

public class CategoryEditAuditDTO {
    private int categoryEditAuditId;
    private String changeFrom;
    private String changeTo;
    private String username;
    private String dateTimeEdited;

    // No-argument constructor
    public CategoryEditAuditDTO() {
    }

    // Constructor with parameters
    public CategoryEditAuditDTO(int categoryEditAuditId, String changeFrom, String changeTo, String username, String dateTimeEdited) {
        this.categoryEditAuditId = categoryEditAuditId;
        this.changeFrom = changeFrom;
        this.changeTo = changeTo;
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

    public String getchangeFrom() {
        return changeFrom;
    }

    public void setChangeFrom(String changeFrom) {
        this.changeFrom = changeFrom;
    }
    
    public String getchangeTo() {
        return changeTo;
    }

    public void setChangeTo(String changeTo) {
        this.changeTo = changeTo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDateTimeEdited() {
        return dateTimeEdited;
    }

    public void setDateTimeEdited(String dateTimeEdited) {
        this.dateTimeEdited = dateTimeEdited;
    }
}
