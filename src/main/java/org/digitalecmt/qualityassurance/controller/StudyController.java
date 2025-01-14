package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.service.StudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing studies.
 */
@RestController
@RequestMapping("/api/studies")
public class StudyController {

    @Autowired
    private StudyService studyService;

    /**
     * Retrieves all studies.
     *
     * @return a ResponseEntity containing a list of all studies and HTTP status OK
     */
    @GetMapping
    public ResponseEntity<List<Study>> getAllStudies() {
        List<Study> studies = studyService.findAllStudies();
        return new ResponseEntity<>(studies, HttpStatus.OK);
    }
}