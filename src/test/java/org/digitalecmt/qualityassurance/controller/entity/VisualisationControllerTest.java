package org.digitalecmt.qualityassurance.controller.entity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.OK;

import java.util.Arrays;
import java.util.List;

import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodGraphDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
import org.digitalecmt.qualityassurance.service.VisualisationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
public class VisualisationControllerTest {

    @InjectMocks
    private VisualisationController visualisationController;

    @Mock
    private VisualisationService visualisationService;

    @BeforeEach
    public void setUp() {
    }

    @Test
    public void testGetPdCategoryDataSuccess() {
        Integer teamId = 1;
        List<PdCategoryGraphDataDTO> mockData = Arrays.asList(new PdCategoryGraphDataDTO(), new PdCategoryGraphDataDTO());
        when(visualisationService.findPdCategoryGraphDataByTeam(teamId)).thenReturn(mockData);

        ResponseEntity<List<PdCategoryGraphDataDTO>> response = visualisationController.getPdCategoryDataByTeam(teamId);

        assertEquals(OK, response.getStatusCode());
        assertEquals(mockData, response.getBody());
        verify(visualisationService, times(1)).findPdCategoryGraphDataByTeam(teamId);
    }

    @Test
    public void testGetPdCategoryBreakdownDataSuccess() {
        Integer teamId = 1;
        DvcatDvdecodGraphDataDTO mockGraphData = new DvcatDvdecodGraphDataDTO();
        when(visualisationService.findPdCategoryBreakdownGraphDataByTeam(teamId)).thenReturn(mockGraphData);

        ResponseEntity<DvcatDvdecodGraphDataDTO> response = visualisationController.getPdCategoryBreakdownDataByTeam(teamId);

        assertEquals(OK, response.getStatusCode());
        assertEquals(mockGraphData, response.getBody());
        verify(visualisationService, times(1)).findPdCategoryBreakdownGraphDataByTeam(teamId);
    }

    @Test
    public void testGetCategoryColoursSuccess() {
        List<String> mockColours = Arrays.asList("red", "green", "blue");
        when(visualisationService.findCategoryColours()).thenReturn(mockColours);

        ResponseEntity<List<String>> response = visualisationController.getCategoryColours();

        assertEquals(OK, response.getStatusCode());
        assertEquals(mockColours, response.getBody());
        verify(visualisationService, times(1)).findCategoryColours();
    }
}