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

import org.digitalecmt.qualityassurance.dto.DataEntryDTO;
import org.digitalecmt.qualityassurance.dto.PdCategoryDTO;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.Dvspondes;
import org.digitalecmt.qualityassurance.model.persistence.PdCategory;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvspondesRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/table")
public class TableController {

    @Autowired
    private DvspondesRepository dvspondesRepository;

    @Autowired
    private PdCategoryRepository pdCategoryRepository;

    @Autowired
    private DataEntryRepository dataEntryRepository;

	// API endpoint to retrieve all data or filter by site ID and study ID
    @GetMapping("/data")
    public ResponseEntity<List<DataEntryDTO>> getData(
            @RequestParam(name = "siteId", required = false) String siteId,
            @RequestParam(name = "studyId", required = false) String studyId) {

        List<DataEntryDTO> dtos = new ArrayList<>();

        if (siteId != null) {
            // Filter by site ID
            List<DataEntry> data = dataEntryRepository.findBySiteId(siteId);
            dtos = mapToDataEntryDTO(data);
        } else if (studyId != null) {
            // Filter by study ID
            List<DataEntry> data = dataEntryRepository.findAllByStudyId(studyId);
            dtos = mapToDataEntryDTO(data);
        } else {
            // Retrieve all data if no filters are applied
            List<DataEntry> data = dataEntryRepository.findAll();
            dtos = mapToDataEntryDTO(data);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

	// Helper method to map DataEntry to DataEntryDTO
    private List<DataEntryDTO> mapToDataEntryDTO(List<DataEntry> data) {
        List<DataEntryDTO> dtos = new ArrayList<>();
        
        for (DataEntry entry : data) {
            // Fetch the Dvspondes entity using dvspondesId
            Dvspondes dvspondes = dvspondesRepository.findById(entry.getDvspondesId()).orElse(null);
            
            PdCategory pdCategory = null;
            Integer categoryId = 0;
            
            // Fetch the PdCategory entity using categoryId
            if (entry.getCategoryId() != null) {
            	pdCategory = pdCategoryRepository.findById(entry.getCategoryId()).orElse(null);
            	categoryId = entry.getCategoryId();
            }
            
            DataEntryDTO dto = new DataEntryDTO(
            	entry.getEntryId(),
                entry.getSiteId(),
                entry.getStudyId(),
                (dvspondes != null) ? dvspondes.getDvspondesValue() : null,
                categoryId,
                (pdCategory != null) ? pdCategory.getDvterm() : null,
                (pdCategory != null) ? pdCategory.getDvdecod() : null,
                (pdCategory != null) ? pdCategory.getDvcat() : null
            );
            dtos.add(dto);
        }
        return dtos;
    }
    
	//API endpoint to retrieve DVTERM, DVDECOD, and DVCAT data
    @GetMapping("/dvterm-data")
    public ResponseEntity<List<PdCategoryDTO>> getDvTermData() {
        List<PdCategory> categories = pdCategoryRepository.findAll();

        List<PdCategoryDTO> dtos = new ArrayList<>();
        for (PdCategory category : categories) {
        	PdCategoryDTO dto = new PdCategoryDTO(
        		category.getCategoryId(),
                category.getDvterm(),
                category.getDvdecod(),
                category.getDvcat()
            );
            dtos.add(dto);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    
    @PostMapping("/update-category")
    public ResponseEntity<String> updateCategory(@RequestBody DataEntryDTO request) {
        try {
            // Find the DataEntry record to update by its ID (entryId)
            DataEntry dataEntry = dataEntryRepository.findById(request.getEntryId())
                    .orElseThrow(() -> new EntityNotFoundException("DataEntry not found"));
            
         // Fetch the new category using the provided dvterm
            PdCategory pdCategory = pdCategoryRepository.findByDvterm(request.getDvterm())
                    .orElseThrow(() -> new EntityNotFoundException("PdCategory not found for dvterm: " + request.getDvterm()));

            // Update the DataEntry record with the new category
            dataEntry.setCategoryId(pdCategory.getCategoryId());
            dataEntryRepository.save(dataEntry);

            return new ResponseEntity<>("Category updated successfully", HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }





}