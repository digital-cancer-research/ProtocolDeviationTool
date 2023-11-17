package org.digitalecmt.qualityassurance.model.persistence;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "category_edit_audit")
public class CategoryEditAudit {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_edit_audit_id", columnDefinition = "serial")
    private int categoryEditAuditId;

	@Column(name = "entry_id")
    private int entryId;
	
    @Column(name = "change_from_to")
    private String changeFromTo;

    @Column(name = "username")
    private String username;

    @Column(name = "date_time_edited")
    private LocalDateTime dateTimeEdited;

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

    public String getchangeFromTo() {
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