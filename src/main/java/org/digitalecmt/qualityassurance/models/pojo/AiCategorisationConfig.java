package org.digitalecmt.qualityassurance.models.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Configuration class for AI categorisation settings.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiCategorisationConfig {
    @JsonProperty("useAi")
    private boolean useAi;
    
    private UncategorisedHandling uncategorisedHandling;
    private MiscategorisedHandling miscategorisationHandling;

    /**
     * Initialises the configuration settings.
     */
    @PostConstruct
    public void init() {
        setProbabilityThresholdConstraint();
        setDvdecodConstraint();
        setNumberOfPredictions();
    }

    /**
     * Sets the probability threshold constraints for uncategorised and miscategorised handling.
     */
    protected void setProbabilityThresholdConstraint() {
        if (uncategorisedHandling != null) {
            uncategorisedHandling.setProbabilityThreshold(
                clamp(uncategorisedHandling.getProbabilityThreshold(), 0, 1)
            );
            uncategorisedHandling.setConditionalProbabilityThreshold(
                clamp(uncategorisedHandling.getConditionalProbabilityThreshold(), 0, 1)
            );
        }

        if (miscategorisationHandling != null) {
            miscategorisationHandling.setProbabilityThreshold(
                clamp(miscategorisationHandling.getProbabilityThreshold(), 0, 1)
            );
            miscategorisationHandling.setConditionalProbabilityThreshold(
                clamp(miscategorisationHandling.getConditionalProbabilityThreshold(), 0, 1)
            );
        }
    }

    /**
     * Ensures allowDvdecod* is set to false if allowDvcat* is false.
     */
    protected void setDvdecodConstraint() {
        if (uncategorisedHandling != null && !uncategorisedHandling.isAllowDvcatPrediction()) {
            uncategorisedHandling.setAllowDvdecodPrediction(false);
        }

        if (miscategorisationHandling != null && !miscategorisationHandling.isAllowDvcatCorrection()) {
            miscategorisationHandling.setAllowDvdecodCorrection(false);
        }
        uncategorisedHandling.setAllowDvdecodPredictionGivenDvcat(true);
        miscategorisationHandling.setAllowDvdecodCorrectionGivenDvcat(true);
    }

    /**
     * Ensures numberOfPredictions is within the range [1, 64].
     */
    protected void setNumberOfPredictions() {
        if (uncategorisedHandling != null) {
            uncategorisedHandling.setNumberOfPredictions(
                clamp(uncategorisedHandling.getNumberOfPredictions(), 1, 64)
            );
        }

        if (miscategorisationHandling != null) {
            miscategorisationHandling.setNumberOfPredictions(
                clamp(miscategorisationHandling.getNumberOfPredictions(), 1, 64)
            );
        }
    }

    /**
     * Clamps a value between a minimum and a maximum range.
     *
     * @param value the value to clamp
     * @param min the minimum value
     * @param max the maximum value
     * @return the clamped value
     */
    private static double clamp(double value, double min, double max) {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * Clamps a Long value between a minimum and a maximum range.
     *
     * @param value the value to clamp
     * @param min the minimum value
     * @param max the maximum value
     * @return the clamped value
     */
    private static long clamp(Long value, long min, long max) {
        if (value == null) return min; // Default to min if null
        return Math.max(min, Math.min(max, value));
    }
}