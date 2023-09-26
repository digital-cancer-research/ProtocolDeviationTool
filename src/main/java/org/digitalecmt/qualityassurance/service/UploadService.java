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

package org.digitalecmt.qualityassurance.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
//import org.digitalecmt.qualityassurance.controller.entity.UploadController.UploadResponse;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.Dvspondes;
import org.digitalecmt.qualityassurance.model.persistence.Study;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvspondesRepository;
import org.digitalecmt.qualityassurance.repository.StudyRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.commons.lang3.StringUtils;

@Service
public class UploadService {

    @Autowired
    private DataEntryRepository dataEntryRepository;
    
    @Autowired
    private StudyRepository studyRepository;
    
    @Autowired
    private DvspondesRepository dvspondesRepository;
    
    
    public String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex == -1) {
            return "";
        }
        return filename.substring(dotIndex + 1);
    }
    
    public ResponseEntity<UploadResponse> checkFileFormat(MultipartFile file) throws IOException {
    String fileExtension = getFileExtension(file.getOriginalFilename());
   
	    try {
	        if (fileExtension.equalsIgnoreCase("csv")) {
	        	return processDataEntryCSV(file);
	        } else if (fileExtension.equalsIgnoreCase("xlsx")) {
	        	return processDataEntryExcel(file);
	        } else {
	            return ResponseEntity.badRequest().body(new UploadResponse("Unsupported file format. Please upload a CSV or Excel file."));
	        }
	    } catch (IOException e) {
//	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new UploadResponse("Failed to process the file."));
	    }
    }
    
    public void parseAndAddData(String siteId, String studyId, String dvsponsdesValue, String dataEntryStudyName, List<DataEntry> dataEntrys) {

        int siteIdInt = Integer.parseInt(siteId);
        int studyIdInt = Integer.parseInt(studyId);

        // Save it to the "study" table
        Study study = new Study();
        study.setStudyId(studyIdInt);
        study.setStudyName(dataEntryStudyName);
        studyRepository.save(study);

        // Save it to the "dvspondes" table
        Dvspondes dvspondes = new Dvspondes();
        dvspondes.setDvspondesValue(dvsponsdesValue);
        dvspondesRepository.save(dvspondes);

        // Create a new DataEntry instance and set its properties
        DataEntry dataEntry = new DataEntry();
        dataEntry.setSiteId(siteIdInt);
        dataEntry.setStudyId(studyIdInt);
        dataEntry.setDvspondesId(dvspondes.getDvspondesId());
        
        // Add the DataEntry instance to the list
        dataEntrys.add(dataEntry);
	
    }
    
    public ResponseEntity<UploadResponse> processDataEntryCSV(MultipartFile file) throws IOException {
    	List<DataEntry> dataEntrys = new ArrayList<>();
    	
    	// Track missing fields
    	List<String> missingCells = new ArrayList<>();
        
        // Dataset
        String dataEntryStudyName = file.getOriginalFilename();
        Study study = new Study();
        study.setStudyName(dataEntryStudyName);
        
        // Read the CSV file and parse its contents
        CSVParser csvParser = CSVParser.parse(file.getInputStream(), StandardCharsets.UTF_8, CSVFormat.DEFAULT.withHeader());
        for (CSVRecord record : csvParser) {
        
            // Extract the data from each row of the CSV file
        	String siteId = record.get("SITEID");
        	String studyId = record.get("STUDYID");
        	String dvsponsdesValue = record.get("DVSPONSDES");
        	
        	if (StringUtils.isBlank(siteId)) {
                missingCells.add("Row " + record.getRecordNumber() + ", Column SITEID");
            }
            if (StringUtils.isBlank(studyId)) {
                missingCells.add("Row " + record.getRecordNumber() + ", Column STUDYID");
            }
            if (StringUtils.isBlank(dvsponsdesValue)) {
                missingCells.add("Row " + record.getRecordNumber() + ", Column DVSPONSDES");
            }
        	
           if (missingCells.isEmpty()) {
        	   parseAndAddData(siteId, studyId, dvsponsdesValue, dataEntryStudyName, dataEntrys);
           }
        }
        
        if (!missingCells.isEmpty()) {
            // Handle missing cells and return a response with an error message
            String errorMessage = "Missing cells:\n" + String.join("\n", missingCells);
            UploadResponse response = new UploadResponse(errorMessage);
            return ResponseEntity.badRequest().body(response);
        } else {
            // Save the dataEntries to the "dataEntries" table
            dataEntryRepository.saveAll(dataEntrys);
            return ResponseEntity.ok(new UploadResponse("CSV file uploaded."));
        }
    }

    public ResponseEntity<UploadResponse> processDataEntryExcel(MultipartFile file) throws IOException {
        List<DataEntry> dataEntrys = new ArrayList<>();
        
    	// Track missing fields
    	List<String> missingCells = new ArrayList<>();

        String dataEntryStudyName = file.getOriginalFilename(); // Get the file name

        Workbook workbook;
        try (InputStream inputStream = file.getInputStream()) {
            workbook = WorkbookFactory.create(inputStream);
        }
       
        Sheet sheet = workbook.getSheetAt(0);
        boolean isFirstRow = true; // Flag to check if it's the first row
        DataFormatter dataFormatter = new DataFormatter();

        for (Row row : sheet) {
        	
        	// Skip the first row
        	if (isFirstRow) {
                isFirstRow = false;
                continue;
            }
            
        	String siteId = dataFormatter.formatCellValue(row.getCell(0));
        	String studyId = dataFormatter.formatCellValue(row.getCell(1));
        	String dvsponsdesValue = dataFormatter.formatCellValue(row.getCell(2));

        	if (StringUtils.isBlank(siteId)) {
                missingCells.add("Row " + (row.getRowNum() + 1) + ", Column SITEID");
            }
            if (StringUtils.isBlank(studyId)) {
                missingCells.add("Row " + (row.getRowNum() + 1) + ", Column STUDYID");
            }
            if (StringUtils.isBlank(dvsponsdesValue)) {
                missingCells.add("Row " + (row.getRowNum() + 1) + ", Column DVSPONSDES");
            }
        	
           if (missingCells.isEmpty()) {
        	   parseAndAddData(siteId, studyId, dvsponsdesValue, dataEntryStudyName, dataEntrys);
           }
        }
    
	    if (!missingCells.isEmpty()) {
	        // Handle missing cells and return a response
	    	String errorMessage = "Missing cells:\n" + String.join("\n", missingCells);
	        return ResponseEntity.badRequest().body(new UploadResponse(errorMessage));
	    } else {
        // Save the dataEntrys to the "dataEntrys" table
        dataEntryRepository.saveAll(dataEntrys);
        return ResponseEntity.ok(new UploadResponse("Excel file uploaded."));
	    }
        
    }
    
    public static class UploadResponse {
        private String message;
        private List<String> missingCells;

        public UploadResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public List<String> getMissingCells() {
            return missingCells;
        }

        public void setMissingCells(List<String> missingCells) {
            this.missingCells = missingCells;
        }
    }


}