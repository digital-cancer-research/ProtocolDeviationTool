package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A dto object for the dvcat breakdown of studies.
 * 
 * <p>
 * The list of studies attribute is a list of study names that are broken down in the data attribute.
 * It is ordered by study name. This dto can be used to build a study breakdown chart - a stacked bar chart in chartjs.
 * </p>
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyBreakdownDataDto {
    private List<String> studies;
    private List<StudyBreakdownDto> data;
}
