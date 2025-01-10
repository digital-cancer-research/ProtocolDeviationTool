package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Composite key class for the association between a site and an external site.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ExternalSiteMappingId implements Serializable {

    /**
     * The ID of the site.
     */
    private Long siteId;

    /**
     * The ID of the external site.
     */
    private Long externalSiteId;
}
