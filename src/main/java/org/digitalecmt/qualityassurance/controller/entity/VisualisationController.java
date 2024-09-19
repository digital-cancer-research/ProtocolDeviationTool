/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package org.digitalecmt.qualityassurance.controller.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.digitalecmt.qualityassurance.dto.CountPerStudyDTO;
import org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryDTO;
import org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryPerStudyDTO;
import org.digitalecmt.qualityassurance.dto.EntryCountPerSubcategoryPerCategoryDTO;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.service.VisualisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visualisation")
public class VisualisationController {

    @Autowired
    private DataEntryRepository dataEntryRepository;

    @Autowired
    private PdCategoryRepository pdCategoryRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private VisualisationService visualisationService;

    private Logger log = Logger.getLogger(VisualisationController.class.getName());

    @GetMapping("/total-rows")
    public ResponseEntity<Long> getTotalRows(@RequestParam(required = false) String siteId) {
        try {
            Long totalRows;
            if (siteId != null) {
                totalRows = dataEntryRepository.countBySiteId(siteId);
            } else {
                totalRows = dataEntryRepository.count();
            }
            return new ResponseEntity<>(totalRows, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-pds")
    public ResponseEntity<Long> getTotalPDsForTeam(@RequestParam(required = true) Integer teamId) {
        try {
            Long totalTeamPDs = teamRepository.countByTeamId(teamId);
            return new ResponseEntity<>(totalTeamPDs, HttpStatus.OK);
        } catch (Exception ex) {
            log.severe("Error fetching total PDs for team: " + ex.getMessage());
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/entry-counts-per-category")
    public ResponseEntity<List<EntryCountPerCategoryDTO>> getEntryCountsPerCategory(
            @RequestParam(required = false) String siteId) {
        try {
            List<EntryCountPerCategoryDTO> entryCounts = new ArrayList<>();

            // Fetch all categories
            List<String> categories = pdCategoryRepository.findDistinctDVCat();
            for (String category : categories) {
                // Fetch entry count for each category
                Long entryCount;
                if (siteId != null) {
                    entryCount = dataEntryRepository.countByCategoryIdAndSiteId(category, siteId);
                } else {
                    entryCount = dataEntryRepository.countByCategory(category);
                }
                // Create DTO and add to the list
                EntryCountPerCategoryDTO entryCountDTO = new EntryCountPerCategoryDTO();
                entryCountDTO.setDvcat(category);
                entryCountDTO.setEntryCount(entryCount);

                entryCounts.add(entryCountDTO);
            }

            return new ResponseEntity<>(entryCounts, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/count-per-study")
    public ResponseEntity<List<CountPerStudyDTO>> getCountPerStudy(
            @RequestParam(required = false) String siteId) {
        try {
            List<CountPerStudyDTO> entryCounts = new ArrayList<>();

            // Fetch all studies
            List<String> studies = dataEntryRepository.findDistinctStudyIds();
            for (String study : studies) {
                Long entryCount;
                if (siteId != null) {
                    entryCount = dataEntryRepository.countByStudyIdAndSiteId(study, siteId);
                } else {
                    entryCount = dataEntryRepository.countByStudyId(study);
                }
                // Create DTO and add to the list
                CountPerStudyDTO entryCountDTO = new CountPerStudyDTO();
                entryCountDTO.setStudyId(study);
                entryCountDTO.setEntryCount(entryCount);

                entryCounts.add(entryCountDTO);
            }

            return new ResponseEntity<>(entryCounts, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/unique-sites")
    public ResponseEntity<List<String>> getUniqueSites() {
        try {
            List<String> uniqueSites = dataEntryRepository.findDistinctSiteIds();
            return new ResponseEntity<>(uniqueSites, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/entry-counts-per-category-per-study")
    public ResponseEntity<List<EntryCountPerCategoryPerStudyDTO>> getEntryCountsPerCategoryPerStudy(
            @RequestParam(required = false) String siteId) {
        try {
            // Fetch entry counts directly from the repository
            List<EntryCountPerCategoryPerStudyDTO> entryCounts = dataEntryRepository.countByCategoryAndStudy(siteId);

            return new ResponseEntity<>(entryCounts, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/entry-counts-per-subcategory-per-category")
    public ResponseEntity<List<EntryCountPerSubcategoryPerCategoryDTO>> getEntryCountsPerSubcategoryPerCategory(
            @RequestParam(required = false) String siteId) {
        try {
            List<EntryCountPerSubcategoryPerCategoryDTO> entryCounts = dataEntryRepository
                    .countBySubcategoryAndCategory(siteId);
            return new ResponseEntity<>(entryCounts, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("category-colours")
    public ResponseEntity<List<String>> getCategoryColours() {
        List<String> colours = visualisationService.findCategoryColours();
        return new ResponseEntity<>(colours, HttpStatus.OK);
    }
}