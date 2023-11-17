package org.digitalecmt.qualityassurance.dto;

public class UpdateCategoryDTO {
	private int entryId;
	private String siteId;
    private String studyId;
    private String dvspondesValue;
    private Integer categoryId;
    private String dvterm;
    private String oldDvterm;
    private String dvdecod;
    private String dvcat;
    private String username;
    private Boolean isEdited;

 // No-argument constructor
    public UpdateCategoryDTO() {
    }

    // Constructor with parameters
    public UpdateCategoryDTO(int entryId, String siteId, String studyId, String dvspondesValue, Integer categoryId, String dvterm, String oldDvterm, String dvdecod, String dvcat, String username, Boolean isEdited) {
    	this.entryId = entryId;
    	this.siteId = siteId;
        this.studyId = studyId;
        this.dvspondesValue = dvspondesValue;
        this.categoryId = categoryId;
        this.dvterm = dvterm;
        this.oldDvterm = oldDvterm;
        this.dvdecod = dvdecod;
        this.dvcat = dvcat;
        this.username = username;
        this.isEdited = isEdited;
    }

    // Getters and setters
    
    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
    }
    
    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    public String getDvspondesValue() {
        return dvspondesValue;
    }

    public void setDvspondesValue(String dvspondesValue) {
        this.dvspondesValue = dvspondesValue;
    }
    
    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getDvterm() {
        return dvterm;
    }

    public void setDvterm(String dvterm) {
        this.dvterm = dvterm;
    }
    
    public String getOldDvterm() {
        return oldDvterm;
    }

    public void setOldDvterm(String oldDvterm) {
        this.oldDvterm = oldDvterm;
    }

    public String getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
    public Boolean getIsEdited() {
        return isEdited;
    }

    public void setIsEdited(Boolean isEdited) {
        this.isEdited = isEdited;
    }
}