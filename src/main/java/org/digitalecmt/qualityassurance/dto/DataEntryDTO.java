package org.digitalecmt.qualityassurance.dto;

import java.util.List;

public class DataEntryDTO {
	private int entryId;
	private String siteId;
    private String studyId;
    private String dvspondesValue;
    private List<Integer> categoryIds;
    private List<String> dvterm;
    private List<String> dvdecod;
    private List<String> dvcat;
    private Boolean isEdited;

 // No-argument constructor
    public DataEntryDTO() {
    }

    // Constructor with parameters
    public DataEntryDTO(int entryId, String siteId, String studyId, String dvspondesValue, List<Integer> categoryIds, List<String> dvterm, List<String> dvdecod, List<String> dvcat, Boolean isEdited) {
    	this.entryId = entryId;
    	this.siteId = siteId;
        this.studyId = studyId;
        this.dvspondesValue = dvspondesValue;
        this.categoryIds = categoryIds;
        this.dvterm = dvterm;
        this.dvdecod = dvdecod;
        this.dvcat = dvcat;
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
    
    public List<Integer> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Integer> categoryIds) {
        this.categoryIds = categoryIds;
    }
    
    public List<String> getDvterm() {
        return dvterm;
    }

    public void setDvterm(List<String> dvterm) {
        this.dvterm = dvterm;
    }

    public List<String> getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(List<String> dvdecod) {
        this.dvdecod = dvdecod;
    }

    public List<String> getDvcat() {
        return dvcat;
    }

    public void setDvcat(List<String> dvcat) {
        this.dvcat = dvcat;
    }
    
    public Boolean getIsEdited() {
        return isEdited;
    }

    public void setIsEdited(Boolean isEdited) {
        this.isEdited = isEdited;
    }
}