package org.digitalecmt.qualityassurance.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class DataEntryServiceTest {

    @Mock
    private DataEntryRepository dataUploadRepository;

    @InjectMocks
    private DataEntryService dataUploadService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllDataUploads() {
        List<DataEntry> testDataUploads = new ArrayList<>();
        testDataUploads.add(new DataEntry());
        testDataUploads.add(new DataEntry());

        when(dataUploadRepository.findAll()).thenReturn(testDataUploads);

        List<DataEntry> result = dataUploadService.getAllDataUploads();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetDataUploadById_ValidId() {
        int dataUploadId = 1;
        DataEntry testDataUpload = new DataEntry();
        testDataUpload.setEntryId(dataUploadId);

        when(dataUploadRepository.findById(dataUploadId)).thenReturn(Optional.of(testDataUpload));

        DataEntry result = dataUploadService.getDataUploadById(dataUploadId);

        assertNotNull(result);
        assertEquals(dataUploadId, result.getEntryId());
    }

    @Test
    public void testGetDataUploadById_InvalidId() {
        int dataUploadId = 999;

        when(dataUploadRepository.findById(dataUploadId)).thenReturn(Optional.empty());

        DataEntry result = dataUploadService.getDataUploadById(dataUploadId);

        assertNull(result);
    }

    @Test
    public void testSaveDataUpload() {
        DataEntry testDataUpload = new DataEntry();
        testDataUpload.setEntryId(1);

        when(dataUploadRepository.save(testDataUpload)).thenReturn(testDataUpload);

        DataEntry result = dataUploadService.saveDataUpload(testDataUpload);

        assertNotNull(result);
        assertEquals(1, result.getEntryId());
    }

    @Test
    public void testDeleteDataUpload() {
        int dataUploadId = 1;

        assertDoesNotThrow(() -> dataUploadService.deleteDataUpload(dataUploadId));

        verify(dataUploadRepository, times(1)).deleteById(dataUploadId);
    }
}
