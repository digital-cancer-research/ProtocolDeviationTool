package org.digitalecmt.qualityassurance.controller.entity;

import static org.mockito.Mockito.*;

import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.service.DataEntryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class DataEntryControllerTest {

    private DataEntryController dataEntryController;
    private DataEntryService dataEntryService;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        dataEntryService = mock(DataEntryService.class);
        dataEntryController = new DataEntryController(dataEntryService);
        mockMvc = MockMvcBuilders.standaloneSetup(dataEntryController).build();
    }

    @Test
    public void testGetAllDataUploads() throws Exception {
        List<DataEntry> dataEntries = new ArrayList<>();
        dataEntries.add(new DataEntry());
        dataEntries.add(new DataEntry());

        when(dataEntryService.getAllDataUploads()).thenReturn(dataEntries);

        mockMvc.perform(get("/api/dataUpload"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(dataEntries.size()));
    }

    @Test
    public void testGetDataUploadById() throws Exception {
        DataEntry dataEntry = new DataEntry();
        dataEntry.setEntryId(1);

        when(dataEntryService.getDataUploadById(1)).thenReturn(dataEntry);

        mockMvc.perform(get("/api/dataUpload/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.entryId").value(1));
    }

    @Test
    public void testSaveDataUpload() throws Exception {
        DataEntry dataEntry = new DataEntry();

        when(dataEntryService.saveDataUpload(any(DataEntry.class))).thenReturn(dataEntry);

        mockMvc.perform(post("/api/dataUpload")
                .content("{}")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.entryId").value(0));
    }

    @Test
    public void testDeleteDataUpload() throws Exception {
        mockMvc.perform(delete("/api/dataUpload/1"))
                .andExpect(status().isOk());

        verify(dataEntryService, times(1)).deleteDataUpload(1);
    }
}
