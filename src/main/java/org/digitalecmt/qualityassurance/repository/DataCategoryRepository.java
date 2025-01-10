package org.digitalecmt.qualityassurance.repository;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.DataCategory;
import org.digitalecmt.qualityassurance.models.entities.DataCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link DataCategory} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface DataCategoryRepository extends JpaRepository<DataCategory, DataCategoryId> {

    Optional<DataCategory> findByEntryIdAndCategoryId(int entryId, int categoryId);

    List<DataCategory> findAllByEntryId(int entryId);

    Long countByCategoryId(Integer categoryId);
}
