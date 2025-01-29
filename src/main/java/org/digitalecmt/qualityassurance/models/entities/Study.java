package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing a study in the system.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Study {

    /**
     * The unique identifier for the study.
     * The id must be within the range of 1 to 255 characters.
     */
    @Id
    @Column(name = "study_id")
    @Size(min = 1, max = 255)
    @NotNull
    private String id;

    /**
     * The name of the study.
     * Must not be null.
     * The name must be within the range of 1 to 255 characters.
     */
    @Column(name = "study_name")
    @Size(min = 1, max = 255)
    private String studyName;
}
