package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.DataAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link DataAudit} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface DataAuditRepository extends JpaRepository<DataAudit, Long> {
}
