package org.digitalecmt.qualityassurance.dto;

/**
 * The {@code StudyDTO} class represents a Data Transfer Object (DTO)
 * for a study with a unique identifier and a flag indicating whether the study
 * should be added or not as part of a POST request.
 * <p>
 * It contains two fields:
 * <ul>
 * <li>{@code studyId} - The unique identifier of the study.</li>
 * <li>{@code flag} - A boolean flag: true=add; false=remove.
 * </li>
 * </ul>
 * </p>
 */
public class StudyDTO {
    private String studyId;
    private boolean flag;

    public StudyDTO() {
    }

    public StudyDTO(String studyId, boolean flag) {
        this.studyId = studyId;
        this.flag = flag;
    }

    public String getStudyId() {
        return this.studyId;
    }

    public void setStudyId(String studyId) {
        this.studyId = studyId;
    }

    public boolean getFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }
}
