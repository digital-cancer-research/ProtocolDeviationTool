package org.digitalecmt.qualityassurance.models.pojo;

import org.digitalecmt.qualityassurance.models.entities.Data;

import com.opencsv.bean.CsvBindByName;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * Represents a data entry from a CSV file.
 */
@lombok.Data
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

    /**
     * Converts this DataEntry to a Data entity.
     *
     * @return the Data entity
     */
    public Data toData() {
        return Data.builder()
        .studyId(studyId)
        .externalSiteId(siteId)
        .dvspondes(dvspondes)
        .build();
    }

    /**
     * Converts this DataEntry to a Data entity and sets the file ID.
     *
     * @param fileId the file ID to set
     * @return the Data entity
     */
    public Data toData(Long fileId) {
        Data data = toData();
        data.setFileId(fileId);
        return data;
    }

    /**
     * Converts this DataEntry to an array of strings.
     *
     * @return an array of strings representing this DataEntry
     */
    public String[] toArray() {
        return new String[] {siteId, studyId, dvspondes, dvcat, dvdecod, dvterm};
    }
}
