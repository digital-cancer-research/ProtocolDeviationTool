package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing the number of PDs per DV category per DVDECOD.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PdsPerDvcatPerDvdecodDto {
    List<String> dvcats;
    List<DvdecodPerStudySpareDto> data;
}
