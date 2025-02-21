package org.digitalecmt.qualityassurance.models.dto.Team;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = false)
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamWithStudiesUpdateDto {
    private long id;
    private long adminId;
    private List<Long> studyIds;
}
