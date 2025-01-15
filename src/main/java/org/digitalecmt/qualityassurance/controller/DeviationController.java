package org.digitalecmt.qualityassurance.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.digitalecmt.qualityassurance.service.DeviationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/deviation")
public class DeviationController {
    
    @Autowired
    private DeviationService deviationService;

    @RequestMapping("/dvcats")
    public ResponseEntity<List<String>> getDvcats() {
        List<String> dvcats = deviationService.getDvcats();
        return new ResponseEntity<>(dvcats, HttpStatus.OK);
    }

    @RequestMapping("/dvdecods")
    public ResponseEntity<List<String>> getDvdecods() {
        List<String> dvdecods = deviationService.getDvdecods();
        return new ResponseEntity<>(dvdecods, HttpStatus.OK);
    }

    @RequestMapping("/dvdecods/{dvcat}")
    public ResponseEntity<List<String>> getDvdecodsByDvcat(@PathVariable("dvcat") String dvcat) {
        List<String> dvdecods = deviationService.getDvdecodsByDvcat(dvcat);
        return new ResponseEntity<>(dvdecods, HttpStatus.OK);
    }
    
    @RequestMapping("/dvterms")
    public ResponseEntity<List<String>> getDvterms() {
        List<String> dvterm = deviationService.getDvterms();
        return new ResponseEntity<>(dvterm, HttpStatus.OK);
    }
    
    @RequestMapping("/dvterm/{dvdecod}")
    public ResponseEntity<Map<String, String>> getDvtermsByDvdecod(@PathVariable("dvdecod") String dvdecod) {
        String dvterm = deviationService.getDvtermByDvdecod(dvdecod);
        Map<String, String> response = new HashMap<>();
        response.put("dvterm", dvterm);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}