package org.digitalecmt.qualityassurance.dto;

public class DataEntryDTO {
	private int entryId;
	private String siteId;
    private String studyId;
    private String dvspondesValue;
    private Integer categoryId;
    private String dvterm;
    private String dvdecod;
    private String dvcat;

 // No-argument constructor
    public DataEntryDTO() {
    }

    // Constructor with parameters
    public DataEntryDTO(int entryId, String siteId, String studyId, String dvspondesValue, Integer categoryId, String dvterm, String dvdecod, String dvcat) {
    	this.entryId = entryId;
    	this.siteId = siteId;
        this.studyId = studyId;
        this.dvspondesValue = dvspondesValue;
        this.categoryId = categoryId;
        this.dvterm = dvterm;
        this.dvdecod = dvdecod;
        this.dvcat = dvcat;
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
}