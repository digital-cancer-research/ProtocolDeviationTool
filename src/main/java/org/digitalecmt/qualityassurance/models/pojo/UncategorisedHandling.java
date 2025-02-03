package org.digitalecmt.qualityassurance.models.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Configuration class for handling uncategorised data.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UncategorisedHandling {
    
    @JsonProperty("allowDvcatPrediction")
    private boolean allowDvcatPrediction;

    @JsonProperty("allowDvdecodPrediction")
    private boolean allowDvdecodPrediction;
    
    @JsonProperty("allowDvdecodGivenDvcatPrediction")
    private boolean allowDvdecodPredictionGivenDvcat;
    
    private double probabilityThreshold;
    private double conditionalProbabilityThreshold;
    private Long numberOfPredictions;
}
