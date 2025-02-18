package org.digitalecmt.qualityassurance.models.dto.Team;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.Study;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamWithStudiesDto {
    private long id;
    private String name;
    private List<Study> studies;
}
