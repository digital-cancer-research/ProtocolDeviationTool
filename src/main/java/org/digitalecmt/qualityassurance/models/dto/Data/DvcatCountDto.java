package org.digitalecmt.qualityassurance.models.dto.Data;

import org.digitalecmt.qualityassurance.models.entities.Dvcat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DvcatCountDto {
    Dvcat dvcat;
    long count;
}
