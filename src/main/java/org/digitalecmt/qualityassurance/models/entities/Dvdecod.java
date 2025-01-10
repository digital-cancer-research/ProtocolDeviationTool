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
 * Entity representing a protocol deviation coded term (DVDECOD).
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Dvdecod {

    /**
     * The unique identifier for the DVDECOD.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dvdecod_id")
    private long id;

    /**
     * The ID of the associated {@link Dvcat}.
     * Must not be null.
     */
    @NotNull
    @Column(name = "dvcat_id")
    private long dvcatId;

    /**
     * The description of the DVDECOD.
     * Must not be null and must be between 1 and 255 characters.
     */
    @Size(min = 1, max = 255)
    @NotNull
    private String description;

    /**
     * The protocol deviation term (DVTERM) associated with the DVDECOD.
     * Must not be null.
     */
    @NotNull
    private String dvterm;

    /**
     * The colour associated with the DVDECOD.
     * Must not be null and must be between 1 and 9 characters.
     */
    @Size(min = 1, max = 9)
    @NotNull
    private String colour;
}
