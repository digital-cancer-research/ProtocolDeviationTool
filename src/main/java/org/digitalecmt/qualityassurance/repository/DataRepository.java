package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Data} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DataRepository extends JpaRepository<Data, Long> {
}
