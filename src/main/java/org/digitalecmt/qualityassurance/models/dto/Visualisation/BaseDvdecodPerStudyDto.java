package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * Base Data Transfer Object (DTO) representing the common properties of DV decode per study.
 */
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BaseDvdecodPerStudyDto {
    String dvcat;
    String dvdecod;
    String colour;
}
