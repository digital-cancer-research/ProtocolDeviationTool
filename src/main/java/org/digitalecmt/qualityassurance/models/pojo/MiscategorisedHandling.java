package org.digitalecmt.qualityassurance.models.pojo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Configuration class for handling miscategorised data.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MiscategorisedHandling {
    private boolean allowDvcatCorrection;
    private boolean allowDvdecodCorrection;
    private boolean allowDvdecodCorrectionGivenDvcat;
    private double probabilityThreshold;
    private double conditionalProbabilityThreshold;
    private Long numberOfPredictions;
}
