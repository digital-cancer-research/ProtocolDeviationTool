package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A dto that is used in StudyBreakdownDataDto. The data contains the dvcat,
 * dvcat occurrences across a list of studies (referenced in the
 * StudyBreakdownDataDto) and the dvcat colour. The ith entry of the count list
 * corresponds to the number of dvcat occurences in the ith study.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudyBreakdownDto {
    private String dvcat;
    private List<Long> count;
    private String colour;
}
