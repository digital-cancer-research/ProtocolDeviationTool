package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.DataAuditDto;
import org.digitalecmt.qualityassurance.models.dto.Data.DataDto;
import org.digitalecmt.qualityassurance.models.dto.Data.DataUpdateDto;
import org.digitalecmt.qualityassurance.service.DataAuditService;
import org.digitalecmt.qualityassurance.service.DataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    DataService dataService;

    @Autowired
    DataAuditService dataAuditService;

    /**
     * Handles GET requests to retrieve all protocol deviation data.
     * 
     * <p>
     * This method fetches all protocol deviation data from the {@link DataService}
     * and
     * returns it in a {@link ResponseEntity}.
     * </p>
     * 
     * @return a {@link ResponseEntity} containing a list of {@link DataDto} objects
     *         representing
     *         all available protocol deviation data and {@code HttpStatus.OK} on a
     *         successful request.
     */
    @GetMapping
    public ResponseEntity<List<DataDto>> getData() {
        return ResponseEntity.ok(dataService.getPdDataByTeamId(null));
    }

    /**
     * Handles GET requests to retrieve protocol deviation data filtered by team ID.
     * 
     * <p>
     * This method fetches protocol deviation data for a specific team based on the
     * provided
     * team ID from the {@link DataService} and returns it in a
     * {@link ResponseEntity}.
     * </p>
     * 
     * @param teamId the ID of the team for which to retrieve protocol deviation
     *               data.
     * @return a {@link ResponseEntity} containing a list of {@link DataDto} objects
     *         representing
     *         the protocol deviation data for the specified team and
     *         {@code HttpStatus.OK} on a
     *         successful request.
     */
    @GetMapping(params = "teamId")
    public ResponseEntity<List<DataDto>> getDataByTeam(@RequestParam Long teamId) {
        return ResponseEntity.ok(dataService.getPdDataByTeamId(teamId));
    }
    
    @GetMapping(params = "study")
    public ResponseEntity<List<DataDto>> getDataByStudy(@RequestParam String study) {
        return ResponseEntity.ok(dataService.getPdDataByStudy(study));
    }

    @PutMapping("/update-entry")
    public ResponseEntity<Void> updateEntry(@RequestBody DataUpdateDto entry) {
        dataService.updateEntry(entry);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/audit")
    public ResponseEntity<List<DataAuditDto>> getDataAudit() {
        List<DataAuditDto> audits = dataAuditService.getAudits();
        return ResponseEntity.ok(audits);
    }
}
