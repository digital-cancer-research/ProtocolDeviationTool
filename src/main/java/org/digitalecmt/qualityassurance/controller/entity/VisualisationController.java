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

import org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryDTO;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.PdCategory;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.digitalecmt.qualityassurance.service.DataEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/visualisation")
public class VisualisationController {

    @Autowired
    private DataEntryRepository dataEntryRepository;
    
    @Autowired
    private PdCategoryRepository pdCategoryRepository;

    @GetMapping("/total-rows")
    public ResponseEntity<Long> getTotalRows() {
        try {
            Long totalRows = dataEntryRepository.count();
            return new ResponseEntity<>(totalRows, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/entry-counts-per-category")
    public ResponseEntity<List<EntryCountPerCategoryDTO>> getEntryCountsPerCategory() {
        try {
            List<EntryCountPerCategoryDTO> entryCounts = new ArrayList<>();

            // Fetch all categories
            List<PdCategory> categories = pdCategoryRepository.findAll();

            for (PdCategory category : categories) {
                // Fetch entry count for each category
                Long entryCount = dataEntryRepository.countByCategoryId(category.getCategoryId());

                // Create DTO and add to the list
                EntryCountPerCategoryDTO entryCountDTO = new EntryCountPerCategoryDTO();
                entryCountDTO.setDvcat(category.getDvcat());
                entryCountDTO.setEntryCount(entryCount);

                entryCounts.add(entryCountDTO);
            }

            return new ResponseEntity<>(entryCounts, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}