package org.digitalecmt.qualityassurance.models.pojo;

import com.opencsv.bean.CsvBindByName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DataEntry {
    
    @CsvBindByName(column = "SITEID", required = true)
    String siteId;
    
    @CsvBindByName(column = "STUDYID", required = true)
    String studyId;
    
    @CsvBindByName(column = "DVSPONDES", required = true)
    String dvspondes;
    
    @CsvBindByName(column = "DVCAT")
    String dvcat;
    
    @CsvBindByName(column = "DVDECOD")
    String dvdecod;
    
    @CsvBindByName(column = "DVTERM")
    String dvterm;

    public org.digitalecmt.qualityassurance.models.entities.Data toData() {
        return org.digitalecmt.qualityassurance.models.entities.Data.builder()
        .studyId(studyId)
        .externalSiteId(siteId)
        .dvspondes(dvspondes)
        .build();
    }

    public org.digitalecmt.qualityassurance.models.entities.Data toData(Long fileId) {
        org.digitalecmt.qualityassurance.models.entities.Data data = toData();
        data.setFileId(fileId);
        return data;
    }
}
