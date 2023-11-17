package org.digitalecmt.qualityassurance.dto;

public class EntryCountPerCategoryDTO {
	private String dvcat;
    private Long entryCount;

    // No-argument constructor
    public EntryCountPerCategoryDTO() {
    }

    // Constructor with parameters
    public EntryCountPerCategoryDTO(String dvcat, Long entryCount) {
        this.dvcat = dvcat;
        this.entryCount = entryCount;
    }

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }

    public Long getEntryCount() {
        return entryCount;
    }

    public void setEntryCount(Long entryCount) {
        this.entryCount = entryCount;
    }
}