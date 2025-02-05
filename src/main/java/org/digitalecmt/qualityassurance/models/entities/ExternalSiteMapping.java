package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing the association between a site and an external site.
 * 
 * @see ExternalSiteMappingId
 */
@Entity
@Table(name = "external_site_mapping")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExternalSiteMapping {

    /**
     * The ID of the external site.
     * This field is part of the composite key.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mapping_id")
    private Long mappingId;
    
    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "external_site_id")
    private String externalSiteId;

    /**
     * The ID of the site.
     * This field is part of the composite key.
     */
    @Column(name = "site_id")
    private Long siteId;

    @PrePersist
    public void prePersist() {
        externalSiteId = externalSiteId.trim().toUpperCase();
    }
}
