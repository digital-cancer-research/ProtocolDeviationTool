package org.digitalecmt.qualityassurance.dto;

public class EntryCountPerCategoryPerStudyDTO {
	private String dvcat;
    private Long entryCount;
    private String studyId;

    // No-argument constructor
    public EntryCountPerCategoryPerStudyDTO() {
    }

    // Constructor with parameters
    public EntryCountPerCategoryPerStudyDTO(String dvcat, Long entryCount, String studyId) {
        this.dvcat = dvcat;
        this.entryCount = entryCount;
        this.studyId = studyId;
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
    
    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }
}