import { MiscategorisedHandling } from "./miscategorised-handling.model";
import { UncategorisedHandling } from "./uncategorised-handling.model";

export interface AiCategorisationConfig {
    useAi: boolean;
    uncategorisedHandling: UncategorisedHandling;
    miscategorisationHandling: MiscategorisedHandling;
}

export const DEFAULT_AI_CONFIG = {
    useAi: true,
    uncategorisedHandling: {
        allowDvcatPrediction: true,
        allowDvdecodPrediction: true,
        probabilityThreshold: 0,
        conditionalProbabilityThreshold: 0,
        numberOfPredictions: 1
    },
    miscategorisationHandling: {
        allowDvcatCorrection: true,
        allowDvdecodCorrection: true,
        probabilityThreshold: 0,
        conditionalProbabilityThreshold: 0,
        numberOfPredictions: 1
    }
} as AiCategorisationConfig