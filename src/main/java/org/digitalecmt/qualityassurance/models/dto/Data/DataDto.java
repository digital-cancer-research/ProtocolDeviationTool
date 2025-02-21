package org.digitalecmt.qualityassurance.models.dto.Data;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class DataDto extends BaseDataDto {
    private List<String> dvcat;
    private List<String> dvdecod;
    private List<String> dvterm;
}
