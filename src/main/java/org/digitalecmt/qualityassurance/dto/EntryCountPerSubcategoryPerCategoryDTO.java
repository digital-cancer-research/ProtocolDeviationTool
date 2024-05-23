package org.digitalecmt.qualityassurance.dto;

public class EntryCountPerSubcategoryPerCategoryDTO {
    private String dvcat;
    private String dvdecod;
    private Long entryCount;

    // No-argument constructor
    public EntryCountPerSubcategoryPerCategoryDTO() {
    }

    // Constructor with parameters
    public EntryCountPerSubcategoryPerCategoryDTO(String dvcat, String dvdecod, Long entryCount) {
        this.dvcat = dvcat;
        this.dvdecod = dvdecod;
        this.entryCount = entryCount;
    }

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }
    
    public String getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public Long getEntryCount() {
        return entryCount;
    }

    public void setEntryCount(Long entryCount) {
        this.entryCount = entryCount;
    }
}