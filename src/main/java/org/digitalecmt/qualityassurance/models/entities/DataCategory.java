package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Column(name = "data_category_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_id")
    @NotNull
    private Long dataId;

    @Column(name = "dvcat_id")
    @NotNull
    private Long dvcatId;
}
