package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.TeamStudy;
import org.digitalecmt.qualityassurance.models.entities.TeamStudyId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link TeamStudy} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface TeamStudyRepository extends JpaRepository<TeamStudy, TeamStudyId> {
}
