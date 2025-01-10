package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.ExternalSiteMapping;
import org.digitalecmt.qualityassurance.models.entities.ExternalSiteMappingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link ExternalSiteMapping} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface ExternalSiteMappingRepository extends JpaRepository<ExternalSiteMapping, ExternalSiteMappingId> {
}
