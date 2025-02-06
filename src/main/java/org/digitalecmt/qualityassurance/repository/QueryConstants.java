package org.digitalecmt.qualityassurance.repository;

/**
 * Constants for query conditions used in the repository layer.
 */
public class QueryConstants {
    /**
     * Condition to check if a team has access to a study.
     */
    public final static String TEAM_HAS_STUDY_ACCESS = ":teamId IS NULL OR d.studyId IN (SELECT ts.studyId FROM TeamStudy ts WHERE ts.teamId = :teamId) ";
}
