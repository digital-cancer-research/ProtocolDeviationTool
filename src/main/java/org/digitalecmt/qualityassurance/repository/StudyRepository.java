package org.digitalecmt.qualityassurance.repository;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Study} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {

    /**
     * Finds a study by its external study ID.
     *
     * @param id the external study ID of the study to find
     * @return an Optional containing the found study, or empty if not found
     */
    Optional<Study> findByExternalStudyId(String id);

    /**
     * Finds all studies ordered by DV category count for a given team.
     *
     * @param teamId the ID of the team
     * @return a list of studies ordered by DV category count
     */
    @Query("SELECT s " +
    "FROM Study s " +
    "JOIN Data d ON d.studyId = s.id " +
    "JOIN DataCategory dc ON dc.dataId = d.id " +
    "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
    "GROUP BY s.id, s.externalStudyId " + 
    "ORDER BY COUNT(d) ASC")
    List<Study> findAllStudiesOrderedByDvcatCount(@Param("teamId") Long teamId);

    /**
     * Finds all studies for a given team.
     *
     * @param teamId the ID of the team
     * @return a list of studies
     */
    @Query("SELECT s FROM Study s " + 
    "LEFT JOIN TeamStudy ts ON ts.studyId = s.id " +
    "WHERE :teamId IS NULL OR :teamId = ts.teamId " +
    "GROUP BY s " + 
    "ORDER BY s.externalStudyId")
    List<Study> findAll(@Param("teamId") Long teamId);
}
