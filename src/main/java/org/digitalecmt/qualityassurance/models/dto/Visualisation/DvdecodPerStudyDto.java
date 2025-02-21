package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Data Transfer Object (DTO) representing the number of PDs per DVDECOD per DV decode for a study.
 */
@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class DvdecodPerStudyDto extends BaseDvdecodPerStudyDto {
    long count;

    DvdecodPerStudyDto(String dvcat, String dvdecod, String colour, long count) {
        this.dvcat = dvcat;
        this.dvdecod = dvdecod;
        this.colour = colour;
        this.count = count;
    }
}
