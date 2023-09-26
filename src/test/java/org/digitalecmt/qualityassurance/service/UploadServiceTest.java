package org.digitalecmt.qualityassurance.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;


import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.Dvspondes;
import org.digitalecmt.qualityassurance.model.persistence.Study;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvspondesRepository;
import org.digitalecmt.qualityassurance.repository.StudyRepository;
import org.digitalecmt.qualityassurance.service.UploadService.UploadResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class UploadServiceTest {
	
	@InjectMocks
    @Spy
    private UploadService uploadService;
    private MultipartFile csvFile;
    private MultipartFile excelFile;
    private MultipartFile fileWithError;

    @Mock
    private DataEntryRepository dataEntryRepository;

    @Mock
    private StudyRepository studyRepository;

    @Mock
    private DvspondesRepository dvspondesRepository;

    @BeforeEach
    public void setUp() throws IOException {
    	
    	MockitoAnnotations.openMocks(this);

        // Mock MultipartFile instances for testing
        csvFile = mock(MultipartFile.class);
        when(csvFile.getOriginalFilename()).thenReturn("sample.csv");
        when(csvFile.getInputStream()).thenReturn(new ByteArrayInputStream("sample content".getBytes()));

        excelFile = mock(MultipartFile.class);
        when(excelFile.getOriginalFilename()).thenReturn("sample.xlsx");
        when(excelFile.getInputStream()).thenReturn(new ByteArrayInputStream("sample content".getBytes()));
    }
    
    @Test
    public void testGetFileExtension() {
        UploadService uploadService = new UploadService();
        assertEquals("csv", uploadService.getFileExtension("sample.csv"));
        assertEquals("xlsx", uploadService.getFileExtension("data.xlsx"));
        assertEquals("", uploadService.getFileExtension("file-without-extension"));
    }
    
    @Test
    public void testCheckFileFormat_CSV() throws IOException {
    	uploadService.checkFileFormat(csvFile);
        verify(uploadService).processDataEntryCSV(csvFile);
    }
    
    @Test
    public void testCheckFileFormat_Excel() throws IOException {
        uploadService.checkFileFormat(excelFile);
        verify(uploadService).processDataEntryExcel(excelFile);
    }

    @Test
    public void testCheckFileFormat_UnsupportedFormat() throws IOException {
        MultipartFile unsupportedFile = mock(MultipartFile.class);
        when(unsupportedFile.getOriginalFilename()).thenReturn("sample.txt");

        ResponseEntity<UploadResponse> response = uploadService.checkFileFormat(unsupportedFile);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Unsupported file format. Please upload a CSV or Excel file.", response.getBody().getMessage());
    }

    @Test
    public void testCheckFileFormat_InternalServerError() throws IOException {
        fileWithError = mock(MultipartFile.class);
        when(fileWithError.getOriginalFilename()).thenReturn("sample.csv");
        when(fileWithError.getInputStream()).thenThrow(new IOException());

        ResponseEntity<UploadResponse> response = uploadService.checkFileFormat(fileWithError);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to process the file.", response.getBody().getMessage());
    }
    
    @Test
    public void testProcessDataEntryCSV() throws IOException {
        String csvData = "SITEID,STUDYID,DVSPONSDES\n" +
                "123,1,Value1\n" +
                "456,2,Value2\n" +
                "789,3,Value3\n" +
                "987,4,Value4\n" +
                "654,5,Value5\n";
        MockMultipartFile csvFile = new MockMultipartFile("dataEntry.csv", csvData.getBytes());

        uploadService.processDataEntryCSV(csvFile);

        verify(dataEntryRepository, times(1)).saveAll(anyList());
    }
    
    @Test
    public void testProcessDataEntryExcel() throws IOException {
    	
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("DataEntry");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("SITEID");
        headerRow.createCell(1).setCellValue("STUDYID");
        headerRow.createCell(2).setCellValue("DVSPONSDES");

        Row dataRow1 = sheet.createRow(1);
        dataRow1.createCell(0).setCellValue("123");
        dataRow1.createCell(1).setCellValue("1");
        dataRow1.createCell(2).setCellValue("Value1");

        Row dataRow2 = sheet.createRow(2);
        dataRow2.createCell(0).setCellValue("456");
        dataRow2.createCell(1).setCellValue("2");
        dataRow2.createCell(2).setCellValue("Value2");

        Row dataRow3 = sheet.createRow(3);
        dataRow3.createCell(0).setCellValue("789");
        dataRow3.createCell(1).setCellValue("3");
        dataRow3.createCell(2).setCellValue("Value3");

        Row dataRow4 = sheet.createRow(4);
        dataRow4.createCell(0).setCellValue("987");
        dataRow4.createCell(1).setCellValue("4");
        dataRow4.createCell(2).setCellValue("Value4");

        Row dataRow5 = sheet.createRow(5);
        dataRow5.createCell(0).setCellValue("654");
        dataRow5.createCell(1).setCellValue("5");
        dataRow5.createCell(2).setCellValue("Value5");

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        MockMultipartFile excelFile = new MockMultipartFile("dataEntry.xlsx", inputStream);

        uploadService.processDataEntryExcel(excelFile);

        verify(dataEntryRepository, times(1)).saveAll(anyList());
    }
    
    @Test
    public void testMissingCellsCSV() throws IOException {
        // Arrange
        String csvData = "SITEID,STUDYID,DVSPONSDES\n" +
                "123,1,Value1\n" +
                "456,,Value2\n" +
                "789,3,Value3\n" +
                "987,4,Value4\n" +
                ",5,Value5\n";
        MockMultipartFile csvFile = new MockMultipartFile("dataEntry.csv", csvData.getBytes());
        
        ResponseEntity<UploadResponse> response = uploadService.processDataEntryCSV(csvFile);

        assertEquals("Missing cells:\n"
        		+ "Row 2, Column STUDYID\n"
        		+ "Row 5, Column SITEID", response.getBody().getMessage());
    }
    
    @Test
    public void testMissingCellsExcel() throws IOException {
    	
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("DataEntry");
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("SITEID");
        headerRow.createCell(1).setCellValue("STUDYID");
        headerRow.createCell(2).setCellValue("DVSPONSDES");

        Row dataRow1 = sheet.createRow(1);
        dataRow1.createCell(0).setCellValue("123");
        dataRow1.createCell(1).setCellValue("");
        dataRow1.createCell(2).setCellValue("Value1");

        Row dataRow2 = sheet.createRow(2);
        dataRow2.createCell(0).setCellValue("456");
        dataRow2.createCell(1).setCellValue("2");
        dataRow2.createCell(2).setCellValue("Value2");

        Row dataRow3 = sheet.createRow(3);
        dataRow3.createCell(0).setCellValue("789");
        dataRow3.createCell(1).setCellValue("3");
        dataRow3.createCell(2).setCellValue("Value3");

        Row dataRow4 = sheet.createRow(4);
        dataRow4.createCell(0).setCellValue("987");
        dataRow4.createCell(1).setCellValue("4");
        dataRow4.createCell(2).setCellValue("Value4");

        Row dataRow5 = sheet.createRow(5);
        dataRow5.createCell(0).setCellValue("");
        dataRow5.createCell(1).setCellValue("5");
        dataRow5.createCell(2).setCellValue("Value5");

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        InputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());

        MockMultipartFile excelFile = new MockMultipartFile("dataEntry.xlsx", inputStream);

        ResponseEntity<UploadResponse> response = uploadService.processDataEntryExcel(excelFile);

        assertEquals("Missing cells:\n"
        		+ "Row 2, Column STUDYID\n"
        		+ "Row 6, Column SITEID", response.getBody().getMessage());
    }

}