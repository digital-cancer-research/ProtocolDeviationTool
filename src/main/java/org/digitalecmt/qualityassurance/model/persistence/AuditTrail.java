package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "audit_trail")
public class AuditTrail {
	
	@Id
    @Column(name = "audit_trail_id")
    @SequenceGenerator(initialValue=1, name="audit_trail_seq", sequenceName="audit_trail_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="audit_trail_seq")
    private int auditTrailId;

	@Column(name = "user_id")
    private int userId;
	
	@Column(name = "entity_changed")
    private String entityChanged;
	
	@Column(name = "attribute_changed")
    private String attributeChanged;
	
    @Column(name = "change_from")
    private String changeFrom;
    
    @Column(name = "change_to")
    private String changeTo;

    @Column(name = "date_time_edited")
    private String dateTimeEdited;

    // Getters and Setters

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