package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Data Transfer Object (DTO) representing the number of PDs per DV category per DVDECOD for a study.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class DvdecodPerStudySpareDto extends BaseDvdecodPerStudyDto {
    ArrayList<Long> count;
}
