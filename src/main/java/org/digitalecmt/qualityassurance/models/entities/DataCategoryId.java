package org.digitalecmt.qualityassurance.models.entities;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class DataCategoryId {
    private Long dataId;
    private Long ddvdecodId;
}
