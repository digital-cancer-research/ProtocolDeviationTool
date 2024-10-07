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
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodGraphDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
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

    /**
     * Retrieves the total number of protocol deviations (PDs) for a specific team.
     *
     * <p>
     * This method interacts with the {@code TeamRepository} to count the total PDs
     * associated
     * with the provided team ID. It returns the total count as a
     * {@code ResponseEntity} containing
     * a {@code Long} value representing the total PDs. In case of an error during
     * data retrieval,
     * an HTTP status of 500 (Internal Server Error) is returned.
     * </p>
     *
     * @param teamId the ID of the team for which to retrieve the total number of
     *               PDs.
     * @return a {@code ResponseEntity} containing the total number of PDs for the
     *         specified team
     *         and an HTTP status of 200 (OK) if the operation is successful, or an
     *         HTTP status
     *         of 500 (Internal Server Error) if an exception occurs during the
     *         retrieval process.
     */
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

    /**
     * Retrieves a list of category (dvcat) colors.
     * 
     * @return a `ResponseEntity` containing a list of category colors and an HTTP
     *         status of 200 (OK).
     */
    @GetMapping("/category-colours")
    public ResponseEntity<List<String>> getCategoryColours() {
        List<String> colours = visualisationService.findCategoryColours();
        return new ResponseEntity<>(colours, HttpStatus.OK);
    }

    /**
     * Retrieves PD category data for a specific team.
     * 
     * This method calls the `visualisationService` to fetch the PD category
     * data associated with a specific team. The data returned includes the
     * category name, the associated color, and the count of related data entries
     * for the given team. The team ID is provided as a request parameter.
     * </p>
     * 
     * @param teamId the ID of the team for which to retrieve PD category data.
     * @return a {@code ResponseEntity} containing a list of
     *         {@code PdCategoryGraphDataDTO}
     *         objects and an HTTP status of 200 (OK).
     */
    @GetMapping("/team-pd-categories")
    public ResponseEntity<List<PdCategoryGraphDataDTO>> getPdCategoryData(@RequestParam("teamId") Integer teamId) {
        List<PdCategoryGraphDataDTO> data = visualisationService.findPdCategoryGraphData(teamId);
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    /**
     * Retrieves PD category data broken down into dvdecods for a specific team.
     *
     * <p>
     * This method returns data for a stacked bar chart in chart.js.
     * It returns a list of dvcats, ordered by their count in descending order.
     * It also returns the data for each dvcat as an array of
     * {@code DvcatDvdecodGraphDataDTO} values,
     * ordered by the size of the dvdecod in descending order, so that the bar chart
     * is in descending order,
     * with the largest dvdecods to the left, for each dvcat.
     * </p>
     *
     * @param teamId the ID of the team for which to retrieve PD category data.
     * @return a {@code ResponseEntity} containing a
     *         {@code DvcatDvdecodGraphDataDTO}
     *         object and an HTTP status of 200 (OK).
     */

    @GetMapping("/team-pd-categories/dvdecod-breakdown")
    public ResponseEntity<DvcatDvdecodGraphDataDTO> getPdCategoryBreakdownData(@RequestParam("teamId") Integer teamId) {
        DvcatDvdecodGraphDataDTO graphData = visualisationService.findPdCategoryBreakdownGraphData(teamId);
        return new ResponseEntity<>(graphData, HttpStatus.OK);
    }

    @GetMapping("/bar-chart-colours")
    public ResponseEntity<List<String>> getBarChartColours() {
        return new ResponseEntity<>(visualisationService.getBarChartColours(), HttpStatus.OK);
    }

    @GetMapping("/pd-categories")
    public ResponseEntity<List<String>> getPdCategories() {
        return new ResponseEntity<>(visualisationService.getPdCategories(), HttpStatus.OK);
    }
}