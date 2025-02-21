package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

/**
 * Entity representing data related to protocol deviations and related details.
 */
@Entity
@lombok.Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Data {

    /**
     * The unique identifier for the data entry.
     */
    @Id
    @Column(name = "data_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "study_id")
    @Size(min = 1, max = 255)
    private Long studyId;

    /**
     * The external site identifier.
     * Must be between 1 and 255 characters.
     */
    @Column(name = "mapping_id")
    private Long mappingId;

    /**
     * PD descriptor assigned by sponsor.
     */
    private String dvspondes;

    /**
     * The ID of the associated file.
     */
    @Column(name = "file_id")
    private Long fileId;

    /**
     * Unique subject identifier.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String usubjid;

    /**
     * Event date.
     */
    private LocalDateTime dventc;

    /**
     * What Event Date and DVENTC represents.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String dventcviz;

    /**
     * Sponsor assigned deviation severity.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String dvsponsev;

    /**
     * Importance of deviation.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String impor;

    /**
     * Action taken.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String at;

    /**
     * Date action is taken.
     */
    @Column(name = "at_date")
    private LocalDateTime atDate;

    /**
     * Domain abbreviation.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String domain;

    /**
     * Sequence number.
     */
    private Long dvseq;

    /**
     * Reference ID.
     */
    @Column(name = "dvref_id")
    private Long dvrefId;

    /**
     * End date/time of deviation
     */
    private Date dvendtc;

    /**
     * Adverse event.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String adv;

    /**
     * Non-adverse event.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String nonadv;

    /**
     * Subcategory for protocol deviation.
     * Must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    private String dvscat;

    /**
     * Start date/time of deviation.
     */
    private LocalDateTime dvstdtc;
}
