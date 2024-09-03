package org.digitalecmt.qualityassurance.dto;

import java.util.List;
import java.util.stream.Collectors;

public class TeamWithStudiesDTO {
    private Integer teamId;
    private List<StudyDTO> studies;

    public TeamWithStudiesDTO() {
    }

    public TeamWithStudiesDTO(Integer teamId, List<StudyDTO> studies) {
        this.teamId = teamId;
        this.studies = studies;
    }

    public static TeamWithStudiesDTO fromStringList(Integer teamId, List<String> studies) {
        List<StudyDTO> studyDTOList = studies.stream()
                .map(study -> new StudyDTO(study, true))
                .collect(Collectors.toList());
        return new TeamWithStudiesDTO(teamId, studyDTOList);
    }

    public Integer getTeamId() {
        return teamId;
    }

    public void setTeamId(Integer teamId) {
        this.teamId = teamId;
    }

    public List<StudyDTO> getStudies() {
        return studies;
    }

    public void setStudies(List<StudyDTO> studies) {
        this.studies = studies;
    }

    public List<String> getStudyIds() {
        return studies.stream()
        .map(study -> study.getStudyId())
        .collect(Collectors.toList());
    }
}
