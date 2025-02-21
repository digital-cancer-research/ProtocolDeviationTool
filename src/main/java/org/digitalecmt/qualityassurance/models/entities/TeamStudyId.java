package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Composite key class for the association between a team and a study.
 * 
 * @see TeamStudy
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TeamStudyId implements Serializable {

    /**
     * The ID of the team.
     */
    @Column(name = "team_id")
    private long teamId;

    /**
     * The ID of the study.
     */
    @Column(name = "study_id")
    @Size(min = 1, max = 255)
    private long studyId;
}
