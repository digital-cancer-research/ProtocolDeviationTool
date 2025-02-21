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
public class AdminAuditDto {
    private String username;
    private LocalDateTime date;
    private String action;
    private String originalValue;
    private String newValue;
}
