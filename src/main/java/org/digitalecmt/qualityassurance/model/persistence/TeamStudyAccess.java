package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "team_study_access")
public class TeamStudyAccess {
    @Id
    @Column(name = "team_study_access_id")
    private int teamStudyAccessId;

    @Column(name = "team_id")
    private int teamId;

    @Column(name = "study_id")
    private int studyId;

    // Getters and Setters

    public int getTeamStudyAccessId() {
        return teamStudyAccessId;
    }

    public void setTeamStudyAccessId(int teamStudyAccessId) {
        this.teamStudyAccessId = teamStudyAccessId;
    }

    public int getTeamId() {
        return teamId;
    }

    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    public int getStudyId() {
        return studyId;
    }

    public void setStudyId(int studyId) {
        this.studyId = studyId;
    }
}
