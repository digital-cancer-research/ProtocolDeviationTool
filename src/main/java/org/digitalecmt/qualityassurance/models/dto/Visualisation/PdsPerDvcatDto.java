package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PdsPerDvcatDto {
    String dvcat;
    String colour;
    long count;
}
