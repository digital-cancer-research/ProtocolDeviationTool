package org.digitalecmt.qualityassurance.repository;

import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Site} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {

    /**
     * Finds a site by its name.
     *
     * @param name the name of the site to find
     * @return an Optional containing the found site, or empty if not found
     */
    public Optional<Site> findByName(String name);
}
