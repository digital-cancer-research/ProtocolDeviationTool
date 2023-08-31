package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_study_access")
public class UserStudyAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_study_access_id", columnDefinition = "serial")
    private int userStudyAccessId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "study_id")
    private int studyId;

    // Getters and Setters

    public int getUserStudyAccessId() {
        return userStudyAccessId;
    }

    public void setUserStudyAccessId(int userStudyAccessId) {
        this.userStudyAccessId = userStudyAccessId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getStudyId() {
        return studyId;
    }

    public void setStudyId(int studyId) {
        this.studyId = studyId;
    }
}
