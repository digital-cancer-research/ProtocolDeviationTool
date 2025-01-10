package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.Dvdecod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Dvdecod} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface DvdecodRepository extends JpaRepository<Dvdecod, Long> {
}
