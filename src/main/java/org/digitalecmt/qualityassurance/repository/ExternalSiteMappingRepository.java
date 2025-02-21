package org.digitalecmt.qualityassurance.repository;

import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.ExternalSiteMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link ExternalSiteMapping} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface ExternalSiteMappingRepository extends JpaRepository<ExternalSiteMapping, Long> {

    public Optional<ExternalSiteMapping> findByExternalSiteIdAndSiteId(String externalSiteId, Long siteId);

}
