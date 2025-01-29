package org.digitalecmt.qualityassurance.repository;

import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Study} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface StudyRepository extends JpaRepository<Study, String> {

    /**
     * Finds a study by its name.
     *
     * @param studyName the name of the study to find
     * @return an Optional containing the found study, or empty if not found
     */
    Optional<Study> findByStudyName(String studyName);
}
