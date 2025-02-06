package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing the association between a team and a study.
 * 
 * @see TeamStudyId
 */
@Entity
@IdClass(TeamStudyId.class)
@Table(name = "team_study")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamStudy {

    /**
     * The ID of the team.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "team_id")
    private Long teamId;

    /**
     * The ID of the study.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "study_id")
    private String studyId;
}
