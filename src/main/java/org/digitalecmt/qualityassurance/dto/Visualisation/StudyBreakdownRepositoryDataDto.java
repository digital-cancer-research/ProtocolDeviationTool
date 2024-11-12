package org.digitalecmt.qualityassurance.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A dto object for data received from the repository to build a study
 * breakdown.
 * 
 * <p>
 * The dto contains the study id, the dvcat, the dvcat count and the dvcat
 * colour. This allows a transformation from a list of these objects into a list
 * of StudyBreakdownDto objects, which is then paired with a list of studies to
 * create a StudyBreakdownDataDto object.
 * </p>
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudyBreakdownRepositoryDataDto {
    String studyId;
    String dvcat;
    Long count;
    String colour;
}
