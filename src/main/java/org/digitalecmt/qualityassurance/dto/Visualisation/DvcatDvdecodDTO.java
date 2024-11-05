package org.digitalecmt.qualityassurance.dto.Visualisation;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class DvcatDvdecodDTO {
    String dvcat;
    String dvdecod;
    Long[] count;
    String colour;

    @JsonIgnore
    public Long getTotalCount() {
        for (Long num : count) {
            if (num != 0) {
                return num;
            }
        }
        return 0L;
    }
}