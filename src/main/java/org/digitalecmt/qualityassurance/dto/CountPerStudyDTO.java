package org.digitalecmt.qualityassurance.dto;

public class CountPerStudyDTO {
	private String studyId;
    private Long entryCount;

    // No-argument constructor
    public CountPerStudyDTO() {
    }

    // Constructor with parameters
    public CountPerStudyDTO(String studyId, Long entryCount) {
        this.studyId = studyId;
        this.entryCount = entryCount;
    }

    public String getStudyId() {
        return studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    public Long getEntryCount() {
        return entryCount;
    }

    public void setEntryCount(Long entryCount) {
        this.entryCount = entryCount;
    }
}