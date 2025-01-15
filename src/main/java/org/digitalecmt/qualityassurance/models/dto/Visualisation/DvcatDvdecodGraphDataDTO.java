package org.digitalecmt.qualityassurance.models.dto.Visualisation;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DvcatDvdecodGraphDataDTO {
    List<String> dvcats;
    List<DvcatDvdecodDTO> data;
}