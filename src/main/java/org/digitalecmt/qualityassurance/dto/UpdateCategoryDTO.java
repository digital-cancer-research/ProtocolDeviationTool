package org.digitalecmt.qualityassurance.dto;

import java.util.List;

public class UpdateCategoryDTO {
	private int entryId;
	private String siteId;
    private String studyId;
    private String dvspondesValue;
    private List<Integer> categoryIds;
    private List<String> dvterms;
    private List<String> oldDvterms;
    private List<String> dvdecods;
    private List<String> dvcats;
    private String username;
    private Boolean isEdited;

 // No-argument constructor
    public UpdateCategoryDTO() {
    }

    // Constructor with parameters
    public UpdateCategoryDTO(int entryId, String siteId, String studyId, String dvspondesValue, List<Integer> categoryIds, List<String> dvterms, List<String> oldDvterms, List<String> dvdecods, List<String> dvcats, String username, Boolean isEdited) {
    	this.entryId = entryId;
    	this.siteId = siteId;
        this.studyId = studyId;
        this.dvspondesValue = dvspondesValue;
        this.categoryIds = categoryIds;
        this.dvterms = dvterms;
        this.oldDvterms = oldDvterms;
        this.dvdecods = dvdecods;
        this.dvcats = dvcats;
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
    
    public List<Integer> getCategoryId() {
        return categoryIds;
    }

    public void setCategoryIds(List<Integer> categoryIds) {
        this.categoryIds = categoryIds;
    }
    
    public List<String> getDvterms() {
        return dvterms;
    }

    public void setDvterms(List<String> dvterms) {
        this.dvterms = dvterms;
    }
    
    public List<String> getOldDvterms() {
        return oldDvterms;
    }

    public void setOldDvterms(List<String> oldDvterms) {
        this.oldDvterms = oldDvterms;
    }

    public List<String> getDvdecods() {
        return dvdecods;
    }

    public void setDvdecods(List<String> dvdecods) {
        this.dvdecods = dvdecods;
    }

    public List<String> getDvcats() {
        return dvcats;
    }

    public void setDvcats(List<String> dvcats) {
        this.dvcats = dvcats;
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