package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.Dvcat;
import org.digitalecmt.qualityassurance.models.entities.Dvdecod;
import org.digitalecmt.qualityassurance.service.DeviationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("api/deviation")
public class DeviationController {
    
    @Autowired
    private DeviationService deviationService;

    @RequestMapping("/dvcats")
    public ResponseEntity<List<Dvcat>> getDvcats() {
        List<Dvcat> dvcats = deviationService.getDvcats();
        return new ResponseEntity<>(dvcats, HttpStatus.OK);
    }

    @RequestMapping("/dvdecods")
    public ResponseEntity<List<Dvdecod>> getDvdecods() {
        List<Dvdecod> dvdecods = deviationService.getDvdecods();
        return new ResponseEntity<>(dvdecods, HttpStatus.OK);
    }

    @RequestMapping(path = "/dvdecods", params = "dvcatIds")
    public ResponseEntity<List<Dvdecod>> getDvdecodsByDvcat(@RequestParam("dvcatIds") List<Long> dvcat) {
        List<Dvdecod> dvdecods = deviationService.getDvdecodsByDvcats(dvcat);
        return new ResponseEntity<>(dvdecods, HttpStatus.OK);
    }
}