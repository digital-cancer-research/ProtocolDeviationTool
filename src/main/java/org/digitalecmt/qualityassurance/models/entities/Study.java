package org.digitalecmt.qualityassurance.models.entities;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
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
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "study_id")
    @NotNull
    private Long id;

    /**
     * The name of the study.
     * Must not be null.
     * The name must be within the range of 1 to 255 characters.
     */
    @Column(name = "external_study_id")
    @Size(min = 1, max = 255)
    private String externalStudyId;

    @PrePersist
    public void prePersist() {
        externalStudyId = externalStudyId.trim().toUpperCase();
    }

    public static String getAuditDetails(List<Study> studies) {
        List<String> externalStudyIds = studies.stream()
                .map(Study::getExternalStudyId)
                .collect(Collectors.toList());

        return new ToStringBuilder(studies, ToStringStyle.JSON_STYLE)
                .append("studies", externalStudyIds)
                .toString();
    }
}
