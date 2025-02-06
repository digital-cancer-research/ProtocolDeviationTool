package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing the number of PDs per DV category for a study.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DvcatPerStudy {
    String dvcat;
    long count;
    String colour;
}
