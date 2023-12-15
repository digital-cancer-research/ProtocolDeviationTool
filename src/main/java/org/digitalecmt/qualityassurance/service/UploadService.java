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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
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
import org.digitalecmt.qualityassurance.model.persistence.FileData;
import org.digitalecmt.qualityassurance.model.persistence.Files;
import org.digitalecmt.qualityassurance.model.persistence.SiteIdColour;
import org.digitalecmt.qualityassurance.model.persistence.StudyIdColour;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvspondesRepository;
import org.digitalecmt.qualityassurance.repository.FileDataRepository;
import org.digitalecmt.qualityassurance.repository.FilesRepository;
import org.digitalecmt.qualityassurance.repository.SiteIdColourRepository;
import org.digitalecmt.qualityassurance.repository.StudyIdColourRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.commons.lang3.StringUtils;

@Service
public class UploadService {

	@Autowired
	private DataEntryRepository dataEntryRepository;

//    @Autowired
//    private StudyRepository studyRepository;

	@Autowired
	private DvspondesRepository dvspondesRepository;

	@Autowired
	private FilesRepository filesRepository;

	@Autowired
	private FileDataRepository fileDataRepository;
	
	@Autowired
	private SiteIdColourRepository siteIdColourRepository;
	
	@Autowired
	private StudyIdColourRepository studyIdColourRepository;

	private Logger log = Logger.getLogger(UploadService.class.getName());
	
	private String previousSiteIdColour = null;
	private String previousStudyIdColour = null;

	public String getFileExtension(String filename) {
		int dotIndex = filename.lastIndexOf('.');
		if (dotIndex == -1) {
			return "";
		}
		return filename.substring(dotIndex + 1);
	}

	public ResponseEntity<UploadResponse> checkFileFormat(MultipartFile file, String username) throws IOException {
		String fileExtension = getFileExtension(file.getOriginalFilename());
		try {
			if (fileExtension.equalsIgnoreCase("csv")) {
				return processDataEntryCSV(file, username);
			} else if (fileExtension.equalsIgnoreCase("xlsx")) {
				return processDataEntryExcel(file, username);
			} else {
				return ResponseEntity.badRequest()
						.body(new UploadResponse("Unsupported file format. Please upload a CSV or Excel file."));
			}
		} catch (MissingCellsException e) {
			return ResponseEntity.ok(new UploadResponse("Failed to upload the file. \n Mandatory data fields are missing. \n" + e.getMessage()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new UploadResponse("Failed to process the file."));
		}
	}

	public void parseAndAddData(String siteId, String studyId, String dvspondesValue, List<DataEntry> dataEntrys,
			Files files) {

//    	// Check if the study has a name, if not, set the name to studyId
//    	Study study = studyRepository.findById(studyId).orElse(null);
//    	if (study == null) {
//    	    study = new Study();
//    	    study.setStudyId(studyId);
//    	    study.setStudyName(studyId);
//    	}
//    	// Save the study to the "study" table
//    	studyRepository.save(study);

		// Save it to the "dvspondes" table
		Dvspondes dvspondes = new Dvspondes();
		dvspondes.setDvspondesValue(dvspondesValue);
		dvspondesRepository.save(dvspondes);

		// Create a new DataEntry instance and set its properties
		DataEntry dataEntry = new DataEntry();
		dataEntry.setSiteId(siteId);
		dataEntry.setStudyId(studyId);
		dataEntry.setDvspondesId(dvspondes.getDvspondesId());

		// Add the DataEntry instance to the list
		dataEntrys.add(dataEntry);
		dataEntryRepository.save(dataEntry);
		
		// Check if the siteId already has a color in the site_id_colour table
	    SiteIdColour existingSiteColor = siteIdColourRepository.findBySiteId(siteId);

	    // Save it to the "site_id_colour" table only if the siteId doesn't exist
	    if (existingSiteColor == null) {
	        SiteIdColour siteIdColour = new SiteIdColour();
	        siteIdColour.setSiteId(siteId);
	        siteIdColour.setColour(generateNextHexColour(previousSiteIdColour));
	        siteIdColourRepository.save(siteIdColour);
	    }
	    
	    // Check if the studyId already has a color in the study_id_colour table
	    StudyIdColour existingStudyColor = studyIdColourRepository.findByStudyId(studyId);

	    // Save it to the "study_id_colour" table only if the studyId doesn't exist
	    if (existingStudyColor == null) {
	        StudyIdColour studyIdColour = new StudyIdColour();
	        studyIdColour.setStudyId(studyId);
	        studyIdColour.setColour(generateNextHexColour(previousStudyIdColour));
	        studyIdColourRepository.save(studyIdColour);
	    }

		// Link the file with the data
		FileData fileData = new FileData();
		fileData.setFileId(files.getFileId());
		fileData.setEntryId(dataEntry.getEntryId());
		fileDataRepository.save(fileData);

	}
    
    public String generateNextHexColour(String previousColour) {
        int offset = 5000;

        // If previousColour is not present or invalid, generate a new color
        if (previousColour == null || !previousColour.matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")) {
            Random random = new Random();
            int colour = random.nextInt(0xFFFFFF + 1);
            previousColour = String.format("#%06X", colour);
            return previousColour;
        }

        // Parse the previousColour and apply the offset
        int previousColourValue = Integer.parseInt(previousColour.substring(1), 16);
        int newColourValue = (previousColourValue + offset) & 0xFFFFFF;

        // Update the previousColour for the next iteration
        previousColour = String.format("#%06X", newColourValue);

        return previousColour;
    }

	public ResponseEntity<UploadResponse> processDataEntryCSV(MultipartFile file, String username)
			throws IOException, MissingCellsException {
		List<DataEntry> dataEntrys = new ArrayList<>();
		// Track missing fields
		List<String> missingCells = new ArrayList<>();

		// Store the filename and date
		String fileName = file.getOriginalFilename();
		LocalDateTime currentDateTime = LocalDateTime.now();
		DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
		Files files = new Files();
		files.setDateTimeUploaded(f.format(currentDateTime));
		files.setFileName(fileName);
		files.setUsername(username);
		filesRepository.save(files);

		// Read the CSV file and parse its contents
		CSVParser csvParser = CSVParser.parse(file.getInputStream(), StandardCharsets.UTF_8,
				CSVFormat.DEFAULT.withHeader());
		for (CSVRecord record : csvParser) {

			// Extract the data from each row of the CSV file
			String siteId = record.get("SITEID");
			String studyId = record.get("STUDYID");
			String dvspondesValue = record.get("DVSPONDES");

			if (StringUtils.isBlank(siteId)) {
				missingCells.add("Row " + record.getRecordNumber() + ", Column SITEID");
			}
			if (StringUtils.isBlank(studyId)) {
				missingCells.add("Row " + record.getRecordNumber() + ", Column STUDYID");
			}
			if (StringUtils.isBlank(dvspondesValue)) {
				missingCells.add("Row " + record.getRecordNumber() + ", Column DVSPONDES");
			}

			if (missingCells.isEmpty()) {
				parseAndAddData(siteId, studyId, dvspondesValue, dataEntrys, files);
			}
		}

		if (!missingCells.isEmpty()) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			throw new MissingCellsException("Missing fields : \n " + String.join("\n", missingCells));

			// Handle missing cells and return a response with an error message
//	            String errorMessage = "Missing cells:\n" + String.join("\n", missingCells);
//	            UploadResponse response = new UploadResponse(errorMessage);
//	            return ResponseEntity.badRequest().body(response);
		} else {
			// Save the dataEntries to the "dataEntries" table
			// dataEntryRepository.saveAll(dataEntrys);
			return ResponseEntity.ok(new UploadResponse("CSV file uploaded."));
		}
	}

	public ResponseEntity<UploadResponse> processDataEntryExcel(MultipartFile file, String username)
			throws IOException, MissingCellsException {
		List<DataEntry> dataEntrys = new ArrayList<>();
		// Track missing fields
		List<String> missingCells = new ArrayList<>();

		// Store the filename and date
		String fileName = file.getOriginalFilename();
		LocalDateTime currentDateTime = LocalDateTime.now();
		DateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm:ss");
		Files files = new Files();
		files.setDateTimeUploaded(f.format(currentDateTime));
		files.setFileName(fileName);
		files.setUsername(username);
		filesRepository.save(files);
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
			String dvspondesValue = dataFormatter.formatCellValue(row.getCell(2));

			// Stop processing when the first empty row is encountered
			if (StringUtils.isBlank(siteId) && StringUtils.isBlank(studyId) && StringUtils.isBlank(dvspondesValue)) {
				break;
			}

			if (StringUtils.isBlank(siteId)) {
				missingCells.add("Row " + (row.getRowNum() + 1) + ", Column SITEID");
			}
			if (StringUtils.isBlank(studyId)) {
				missingCells.add("Row " + (row.getRowNum() + 1) + ", Column STUDYID");
			}
			if (StringUtils.isBlank(dvspondesValue)) {
				missingCells.add("Row " + (row.getRowNum() + 1) + ", Column DVSPONDES");
			}

			if (missingCells.isEmpty()) {
				parseAndAddData(siteId, studyId, dvspondesValue, dataEntrys, files);
			}
		}
		if (!missingCells.isEmpty()) {
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
			throw new MissingCellsException("Missing fields: \n " + String.join("\n", missingCells));
		} else {
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