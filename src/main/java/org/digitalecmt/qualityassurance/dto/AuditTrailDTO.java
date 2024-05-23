package org.digitalecmt.qualityassurance.dto;

public class AuditTrailDTO {
    private int auditTrailId;
    private int userId;
    private String username;
    private String entityChanged;
    private String attributeChanged;
    private String changeFrom;
    private String changeTo;
    private String dateTimeEdited;

    // No-argument constructor
    public AuditTrailDTO() {
    }

    // Constructor with parameters
    public AuditTrailDTO(int auditTrailId, int userId, String username, String entityChanged, String attributeChanged, String changeFrom, String changeTo, String dateTimeEdited) {
        this.auditTrailId = auditTrailId;
        this.userId = userId;
        this.username = username;
        this.entityChanged = entityChanged;
        this.attributeChanged = attributeChanged;
        this.changeFrom = changeFrom;
        this.changeTo = changeTo;
        this.dateTimeEdited = dateTimeEdited;
    }

    // Getters and setters
    public int getAuditTrailId() {
        return auditTrailId;
    }

    public void setAuditTrailId(int auditTrailId) {
        this.auditTrailId = auditTrailId;
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
    
    public String getEntityChanged() {
        return entityChanged;
    }

    public void setEntityChanged(String entityChanged) {
        this.entityChanged = entityChanged;
    }
    
    public String getAttributeChanged() {
        return attributeChanged;
    }

    public void setAttributeChanged(String attributeChanged) {
        this.attributeChanged = attributeChanged;
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

    public String getDateTimeEdited() {
        return dateTimeEdited;
    }

    public void setDateTimeEdited(String dateTimeEdited) {
        this.dateTimeEdited = dateTimeEdited;
    }
}
