package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.models.entities.ExternalSiteMapping;
import org.digitalecmt.qualityassurance.models.entities.Site;
import org.digitalecmt.qualityassurance.repository.ExternalSiteMappingRepository;
import org.digitalecmt.qualityassurance.repository.SiteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing sites and their external mappings.
 */
@Service
public class SiteService {

    @Autowired
    private SiteRepository siteRepository;

    @Autowired
    private ExternalSiteMappingRepository externalSiteMappingRepository;

    /**
     * Adds the default mapping for the given external site ID. This mapping is to
     * the site 'ALL SITES'.
     *
     * @param externalSiteId the external site ID
     * @return the created or existing external site mapping
     */
    public ExternalSiteMapping addDefaultMapping(String externalSiteId) {
        return siteRepository.findByName("ALL SITES")
                .map(site -> addExternalSiteMappingIfNotPresent(site.getId(), externalSiteId))
                .orElseGet(() -> {
                    Site site = addSiteIfNotPresent("ALL SITES");
                    return addExternalSiteMappingIfNotPresent(site.getId(), externalSiteId);
                });
    }

    /**
     * Adds an external site mapping if it does not already exist.
     *
     * @param siteId         the site ID
     * @param externalSiteId the external site ID
     * @return the created or existing external site mapping
     */
    public ExternalSiteMapping addExternalSiteMappingIfNotPresent(Long siteId, String externalSiteId) {
        String formattedExternalSiteId = externalSiteId.trim().toUpperCase();
        return externalSiteMappingRepository.findByExternalSiteIdAndSiteId(formattedExternalSiteId, siteId)
                .orElseGet(() -> addExternalSiteMapping(siteId, formattedExternalSiteId));
    }

    /**
     * Adds an external site mapping.
     *
     * @param siteId         the site ID
     * @param externalSiteId the external site ID
     * @return the created external site mapping
     */
    private ExternalSiteMapping addExternalSiteMapping(Long siteId, String externalSiteId) {
        ExternalSiteMapping mapping = ExternalSiteMapping.builder()
                .siteId(siteId)
                .externalSiteId(externalSiteId)
                .build();
        return externalSiteMappingRepository.save(mapping);
    }

    /**
     * Adds a site if it does not already exist.
     *
     * @param name the name of the site
     * @return the created or existing site
     */
    public Site addSiteIfNotPresent(String name) {
        return siteRepository.findByName(name).orElseGet(() -> addSite(name));
    }

    /**
     * Adds a site.
     *
     * @param name the name of the site
     * @return the created site
     */
    private Site addSite(String name) {
        Site site = Site.builder()
                .name(name)
                .build();
        return siteRepository.save(site);
    }
}
