package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
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
@IdClass(ExternalSiteMappingId.class)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ExternalSiteMapping {

    /**
     * The ID of the site.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "site_id")
    private Long siteId;

    /**
     * The ID of the external site.
     * This field is part of the composite key.
     */
    @Id
    @Column(name = "external_site_id")
    @Size(min = 1, max = 255)
    private String externalSiteId;
}
