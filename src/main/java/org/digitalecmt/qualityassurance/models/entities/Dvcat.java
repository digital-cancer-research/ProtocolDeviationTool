package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing a category for protocol deviation (DVCAT).
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Dvcat {

    /**
     * The unique identifier for the DVCAT.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dvcat_id")
    private long id;

    /**
     * The description of the DVCAT.
     * Must not be null and must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    @NotNull
    private String description;

    /**
     * The colour associated with the DVCAT.
     * Must not be null and must be between 1 and 9 characters.
     */
    @Size(min = 1, max = 9)
    @NotNull
    private String colour;
}
