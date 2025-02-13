package org.digitalecmt.qualityassurance.models.dto.Audit;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DataAuditDto {
    private String username;
    private String studyId;
    private String dvspondes;
    private String originalData;
    private String modifiedData;
    private LocalDateTime date;
}
