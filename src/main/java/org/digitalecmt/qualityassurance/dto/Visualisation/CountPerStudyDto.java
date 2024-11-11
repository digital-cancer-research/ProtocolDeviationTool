package org.digitalecmt.qualityassurance.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * A dto object that is used to display the number of entries for a study.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CountPerStudyDto {
	private String studyId;
    private Long entryCount;
}