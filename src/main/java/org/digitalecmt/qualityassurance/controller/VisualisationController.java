package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatPerDvdecodDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerStudyDto;
import org.digitalecmt.qualityassurance.service.VisualisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.azure.core.annotation.QueryParam;

/**
 * Controller class for managing visualisation-related operations.
 */
@RestController
@RequestMapping("/api/visualisation")
public class VisualisationController {
    @Autowired
    VisualisationService visualisationService;

    /**
     * Retrieves the count of PDs for a given team.
     *
     * @param teamId the ID of the team
     * @return a ResponseEntity containing the count of PDs and HTTP status OK
     */
    @GetMapping("/pds")
    public ResponseEntity<Long> getPdCount(@QueryParam("teamId") Long teamId) {
        long count = visualisationService.getPdCount(teamId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    /**
     * Retrieves the PDs per DV category for a given team.
     *
     * @param teamId the ID of the team
     * @return a ResponseEntity containing the list of PDs per DV category and HTTP
     *         status OK
     */
    @GetMapping("/pds-per-dvcat")
    public ResponseEntity<List<PdsPerDvcatDto>> getPdsPerDvcat(@QueryParam("teamId") Long teamId) {
        List<PdsPerDvcatDto> data = visualisationService.getPdsPerDvcat(teamId);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieves the PDs per study for a given team.
     *
     * @param teamId the ID of the team
     * @return a ResponseEntity containing the list of PDs per study and HTTP status
     *         OK
     */
    @GetMapping("/pds-per-study")
    public ResponseEntity<List<PdsPerStudyDto>> getPdsPerStudy(@QueryParam("teamId") Long teamId) {
        List<PdsPerStudyDto> data = visualisationService.getPdsPerStudy(teamId);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieves the PDs per DV category per study for a given team.
     *
     * @param teamId the ID of the team
     * @return a ResponseEntity containing the PDs per DV category per study and
     *         HTTP status OK
     */
    @GetMapping("/pds-per-dvcat-per-study")
    public ResponseEntity<PdsPerDvcatPerStudyDto> getPdsPerDvcatPerStudy(@QueryParam("teamId") Long teamId) {
        PdsPerDvcatPerStudyDto data = visualisationService.getPdsPerDvcatPerStudy(teamId);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieves the PDs per DV category per DVDECOD for a given team.
     *
     * @param teamId the ID of the team
     * @return a ResponseEntity containing the PDs per DV category per DVDECOD and
     *         HTTP status OK
     */
    @GetMapping("/pds-per-dvcat-per-dvdecod")
    public ResponseEntity<PdsPerDvcatPerDvdecodDto> getPdsPerDvcatPerDvdecodDto(@QueryParam("teamId") Long teamId,
            @QueryParam("externalStudyId") String externalStudyId) {
        PdsPerDvcatPerDvdecodDto data;
        if (teamId != null) {
            data = visualisationService.getPdsPerDvcatPerDvdecodDto(teamId);
        } else if (externalStudyId != null) {
            data = visualisationService.getPdsPerDvcatPerDvdecodDto(externalStudyId);
        } else {
            data = visualisationService.getPdsPerDvcatPerDvdecodDto(teamId);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}