package org.digitalecmt.qualityassurance.controller.entity;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.io.InputStream;

import org.digitalecmt.qualityassurance.service.UploadService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class UploadControllerTest {

    private UploadController uploadController;
    private UploadService uploadService;
    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        uploadService = mock(UploadService.class);
        uploadController = new UploadController(uploadService);
        mockMvc = MockMvcBuilders.standaloneSetup(uploadController).build();
    }

    @Test
    public void testUploadFile_Success() throws Exception {
        InputStream inputStream = getClass().getResourceAsStream("/test.csv");
        MockMultipartFile file = new MockMultipartFile("file", "test.csv", MediaType.TEXT_PLAIN_VALUE, inputStream);

        mockMvc.perform(multipart("/api/upload").file(file))
                .andExpect(status().isOk());
//                .andExpect(content().string("Data has been loaded"));

        verify(uploadService, times(1)).checkFileFormat(file);
    }

    @Test 
    public void testUploadFile_Failure() throws Exception {
        InputStream inputStream = getClass().getResourceAsStream("/test.csv");
        MockMultipartFile file = new MockMultipartFile("file", "test.csv", MediaType.TEXT_PLAIN_VALUE, inputStream);

        when(uploadService.checkFileFormat(file)).thenThrow(new IOException());

        mockMvc.perform(multipart("/api/upload").file(file))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("{\"message\":\"Data has not been loaded\",\"missingCells\":null}"));

        verify(uploadService, times(1)).checkFileFormat(file);
    }
}
