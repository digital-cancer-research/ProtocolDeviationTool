package org.digitalecmt.qualityassurance.repository;

import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Dvcat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Dvcat} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DvcatRepository extends JpaRepository<Dvcat, Long> {
    
    public Optional<Dvcat> findByDescription(String description);

}