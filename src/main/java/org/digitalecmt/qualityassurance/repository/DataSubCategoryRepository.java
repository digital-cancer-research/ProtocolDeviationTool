package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.DataSubCategory;
import org.digitalecmt.qualityassurance.models.entities.DataSubCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataSubCategoryRepository extends JpaRepository<DataSubCategory, DataSubCategoryId> {
    
}
