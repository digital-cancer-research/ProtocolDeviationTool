package org.digitalecmt.qualityassurance.models.dto.Data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategorisationDto {
    String dvcats;
    String dvdecods;
    String dvterms;
}
