package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "data_entry_category")
public class DataEntryCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "data_entry_category_id")
    private Integer dataEntryCategoryId;

    @Column(name = "entry_id", nullable = false)
    private Integer entryId;

    @Column(name = "category_id", nullable = false)
    private Integer categoryId;

    // Getters and setters

    public Integer getDataEntryCategoryId() {
        return dataEntryCategoryId;
    }

    public void setDataEntryCategoryId(Integer dataEntryCategoryId) {
        this.dataEntryCategoryId = dataEntryCategoryId;
    }

    public Integer getEntryId() {
        return entryId;
    }

    public void setEntryId(Integer entryId) {
        this.entryId = entryId;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
}
