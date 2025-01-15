package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PdCategoryGraphDataDTO {
    String dvcat;
    String colour;
    Long count;
}