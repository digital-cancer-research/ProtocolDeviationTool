package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing the association between data and a category.
 */
@Entity
@Table(name = "data_category")
@IdClass(DataCategoryId.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataCategory {

    /**
     * The ID of the associated data.
     * Must not be null.
     */
    @Id
    @Column(name = "data_id")
    @NotNull
    private Long dataId;

    /**
     * The ID of the associated DV decode.
     * Must not be null.
     */
    @Id
    @Column(name = "dvdecod_id")
    @NotNull
    private Long dvdecodId;
}
