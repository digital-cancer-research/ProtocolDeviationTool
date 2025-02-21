package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing the number of PDs per study.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PdsPerStudyDto {
    String study;
    long count;
}
