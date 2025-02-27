package org.digitalecmt.qualityassurance.models.dto.Data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BaseDataDto {
    private Long id;
    private Long fileId;
    private String siteId;
    private String studyId;
    private String dvspondes;
}
