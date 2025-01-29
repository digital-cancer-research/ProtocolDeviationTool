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
 * Entity representing a site in the system.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Site {

    /**
     * The unique identifier for the site.
     */
    @Id
    @Column(name = "site_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the site.
     * Must not be null and must be between 1 and 255 characters.
     */
    @Column(name = "site_name")
    @Size(min = 1, max = 255)
    @NotNull
    private String name;
}