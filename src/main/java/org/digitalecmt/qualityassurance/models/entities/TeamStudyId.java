package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

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
    private long teamId;

    /**
     * The ID of the study.
     */
    private long studyId;
}
