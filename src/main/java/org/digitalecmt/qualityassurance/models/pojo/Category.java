package org.digitalecmt.qualityassurance.models.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a category with its associated probability.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Category {
    String dvcat;
    String dvdecod;
    double probability;
}
