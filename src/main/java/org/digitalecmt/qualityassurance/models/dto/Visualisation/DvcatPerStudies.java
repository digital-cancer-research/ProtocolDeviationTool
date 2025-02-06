package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing the number of PDs per DV category across multiple studies.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DvcatPerStudies {
    String dvcat;
    ArrayList<Long> count;
    String colour;
}
