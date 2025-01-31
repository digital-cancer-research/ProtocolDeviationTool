package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Composite key class for the association between data and a category.
 * 
 * @see DataCategory
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class DataSubCategoryId implements Serializable {

    /**
     * The ID of the associated data.
     */
    private Long dataCategoryId;

    /**
     * The ID of the associated DV decode.
     */
    private Long dvdecodId;
}
