package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.DataCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link DataCategory}
 * entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DataCategoryRepository extends JpaRepository<DataCategory, Long> {

    public List<DataCategory> findAllByDataId(Long dataId);

    public void deleteAllByDataId(long dataId);
}
