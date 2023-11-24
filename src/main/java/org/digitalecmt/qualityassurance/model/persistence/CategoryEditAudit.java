package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category_edit_audit")
public class CategoryEditAudit {
	
	@Id
    @Column(name = "category_edit_audit_id")
    @SequenceGenerator(initialValue=1, name="category_edit_audit_seq", sequenceName="category_edit_audit_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="category_edit_audit_seq")
    private int categoryEditAuditId;

	@Column(name = "entry_id")
    private int entryId;
	
    @Column(name = "change_from")
    private String changeFrom;
    
    @Column(name = "change_to")
    private String changeTo;

    @Column(name = "username")
    private String username;

    @Column(name = "date_time_edited")
    private String dateTimeEdited;

    // Getters and Setters

    public int getCategoryEditAuditId() {
        return categoryEditAuditId;
    }

    public void setCategoryEditAuditId(int categoryEditAuditId) {
        this.categoryEditAuditId = categoryEditAuditId;
    }
    
    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
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