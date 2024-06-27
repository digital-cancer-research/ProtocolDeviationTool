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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.digitalecmt.qualityassurance.dto.CategoryEditAuditDTO;
import org.digitalecmt.qualityassurance.dto.DataEntryDTO;
import org.digitalecmt.qualityassurance.dto.PdCategoryDTO;
import org.digitalecmt.qualityassurance.dto.UpdateCategoryDTO;
import org.digitalecmt.qualityassurance.model.persistence.CategoryEditAudit;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.DataEntryCategory;
import org.digitalecmt.qualityassurance.model.persistence.Dvspondes;
import org.digitalecmt.qualityassurance.model.persistence.PdCategory;
import org.digitalecmt.qualityassurance.repository.CategoryEditAuditRepository;
import org.digitalecmt.qualityassurance.repository.DataEntryCategoryRepository;
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
    
    @Autowired
    private CategoryEditAuditRepository categoryEditAuditRepository;
    
    @Autowired
    private DataEntryCategoryRepository dataEntryCategoryRepository;

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
            
            // Fetch the DataEntryCategory record to update based on entry_id
            List<DataEntryCategory> dataEntryCategory = dataEntryCategoryRepository.findAllByEntryId(
            		entry.getEntryId());
            
            PdCategory pdCategory = null;
            Integer categoryId = 0;
            List<Integer> categoryIds = new ArrayList<>();
            List<String> dvterms = new ArrayList<>();
            List<String> dvdecods = new ArrayList<>();
            List<String> dvcats = new ArrayList<>();
            
            // Fetch the PdCategory entity using categoryId
            for (DataEntryCategory dataEntryCategories : dataEntryCategory) {
	            if (dataEntryCategories.getCategoryId() != null) {
	            	pdCategory = pdCategoryRepository.findById(dataEntryCategories.getCategoryId()).orElse(null);
	            	categoryId = dataEntryCategories.getCategoryId();
	            	categoryIds.add(categoryId);
	            	dvterms.add(pdCategory.getDvterm());
                    dvdecods.add(pdCategory.getDvdecod());
                    dvcats.add(pdCategory.getDvcat());
	            }
            }
	            
            DataEntryDTO dto = new DataEntryDTO(
            	entry.getEntryId(),
                entry.getSiteId(),
                entry.getStudyId(),
                (dvspondes != null) ? dvspondes.getDvspondesValue() : null,
                categoryIds,
                dvterms,
                dvdecods,
                dvcats,
                entry.getIsEdited()
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
    public ResponseEntity<HttpStatus> updateCategory(@RequestBody UpdateCategoryDTO request) {
        try {
            System.out.println("Received request to update category: " + request);
            
            // Find the DataEntry record to update by its ID (entryId)
            DataEntry dataEntry = dataEntryRepository.findById(request.getEntryId())
                    .orElseThrow(() -> new EntityNotFoundException("DataEntry not found"));
            System.out.println("Found DataEntry: " + dataEntry);

            // Fetch the DataEntryCategory records to update based on entry_id
            List<DataEntryCategory> dataEntryCategories = dataEntryCategoryRepository.findAllByEntryId(request.getEntryId());
            System.out.println("Found DataEntryCategories: " + dataEntryCategories);

            System.out.println("Found Dvdecods: " + request.getDvdecods());
            
            // Fetch the PdCategory entities using the provided dvdecods
            List<PdCategory> pdCategories = pdCategoryRepository.findByDvdecodIn(request.getDvdecods());
            System.out.println("Found PdCategories: " + pdCategories);

            // Update the DataEntryCategory records
            for (int i = 0; i < pdCategories.size(); i++) {
                DataEntryCategory dataEntryCategory;
                if (i < dataEntryCategories.size()) {
                    // If the DataEntryCategory record exists, update it
                    dataEntryCategory = dataEntryCategories.get(i);
                    System.out.println("Updating existing DataEntryCategory: " + dataEntryCategory);
                } else {
                    // If the DataEntryCategory record does not exist, create a new one
                    dataEntryCategory = new DataEntryCategory();
                    dataEntryCategory.setEntryId(request.getEntryId());
                    System.out.println("Creating new DataEntryCategory: " + dataEntryCategory);
                }
                // Update the category_id of the DataEntryCategory record
                dataEntryCategory.setCategoryId(pdCategories.get(i).getCategoryId());
                dataEntryCategoryRepository.save(dataEntryCategory);
                System.out.println("Saved DataEntryCategory: " + dataEntryCategory);
            }

            // Set the isEdited flag to true
            dataEntry.setIsEdited(true);
            dataEntryRepository.save(dataEntry);
            System.out.println("Updated DataEntry isEdited flag and saved DataEntry: " + dataEntry);

            // Log the edit information
            String changeFrom = String.join(",", request.getOldDvdecods());
            String changeTo = String.join(",", request.getDvdecods());
            String username = request.getUsername();
            LocalDateTime currentLocalDateTime = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
            String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);
            int entryId = request.getEntryId();

            System.out.println("Logging edit information");
            System.out.println("changeFrom: " + changeFrom);
            System.out.println("changeTo: " + changeTo);
            System.out.println("username: " + username);
            System.out.println("dateTimeEdited: " + dateTimeEdited);
            System.out.println("entryId: " + entryId);

            CategoryEditAudit categoryEditAudit = new CategoryEditAudit();
            categoryEditAudit.setEntryId(entryId);
            categoryEditAudit.setChangeFrom(changeFrom);
            categoryEditAudit.setChangeTo(changeTo);
            categoryEditAudit.setUsername(username);
            categoryEditAudit.setDateTimeEdited(dateTimeEdited);

            categoryEditAuditRepository.save(categoryEditAudit);
            System.out.println("Saved CategoryEditAudit: " + categoryEditAudit);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (EntityNotFoundException ex) {
            System.out.println("EntityNotFoundException: " + ex.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    
    @GetMapping("/audit-entries/{entryId}")
    public ResponseEntity<List<CategoryEditAuditDTO>> getAuditEntries(@PathVariable int entryId) {
        try {
//            System.out.println("Fetching audit entries for entryId: " + entryId);

            // Fetch all audit entries for the given entryId
            List<CategoryEditAuditDTO> auditEntries = categoryEditAuditRepository.findAllByEntryId(entryId);

//            System.out.println("Fetched audit entries: " + auditEntries);
            
            return new ResponseEntity<>(auditEntries, HttpStatus.OK);
        } catch (Exception ex) {
            System.out.println("Error fetching audit entries: " + ex.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/update-study-id")
    public ResponseEntity<Void> updateStudyId(@RequestBody Map<String, Object> payload) {
        try {
            Long entryId = Long.valueOf(payload.get("entryId").toString());
            String newStudyId = (String) payload.get("newStudyId");

            Optional<DataEntry> optionalDataEntry = dataEntryRepository.findByEntryId(entryId);
            if (optionalDataEntry.isPresent()) {
                DataEntry dataEntry = optionalDataEntry.get();
                dataEntry.setStudyId(newStudyId);
                dataEntryRepository.save(dataEntry);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build(); // Handle invalid entryId format
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}