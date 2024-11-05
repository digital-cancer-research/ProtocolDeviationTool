package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodGraphDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodRepositoryDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
import org.digitalecmt.qualityassurance.model.persistence.DvcatColour;
import org.digitalecmt.qualityassurance.repository.DvcatColourRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class VisualisationServiceTest {

    @InjectMocks
    private VisualisationService visualisationService;

    @Mock
    private PdCategoryRepository pdCategoryRepository;

    @Mock
    private DvcatColourRepository dvcatColourRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindCategoryColours() {
        
        List<DvcatColour> mockColours = new ArrayList<>();
        mockColours.add(new DvcatColour("CategoryA", "Red"));
        mockColours.add(new DvcatColour("CategoryB", "Blue"));

        when(dvcatColourRepository.findAll()).thenReturn(mockColours);

        List<String> colours = visualisationService.findCategoryColours();

        assertEquals(2, colours.size());
        assertTrue(colours.contains("Red"));
        assertTrue(colours.contains("Blue"));
        verify(dvcatColourRepository, times(1)).findAll();
    }

    @Test
    void testFindPdCategoryGraphDataWithExistingCategories() {
        
        Integer teamId = 1;
        List<PdCategoryGraphDataDTO> existingData = new ArrayList<>();
        existingData.add(new PdCategoryGraphDataDTO("CategoryA", "Red", 5L));
        when(pdCategoryRepository.findPdCategoryGraphDataByTeamId(teamId)).thenReturn(existingData);

        List<DvcatColour> mockColours = new ArrayList<>();
        mockColours.add(new DvcatColour("CategoryA", "Red"));
        mockColours.add(new DvcatColour("CategoryB", "Blue"));
        when(dvcatColourRepository.findAll()).thenReturn(mockColours);

        List<PdCategoryGraphDataDTO> result = visualisationService.findPdCategoryGraphDataByTeam(teamId);

        assertEquals(2, result.size());
        assertEquals("CategoryA", result.get(0).getDvcat());
        assertEquals("Red", result.get(0).getColour());
        assertEquals(Long.valueOf(5), result.get(0).getCount());
        assertEquals("CategoryB", result.get(1).getDvcat());
        assertEquals("Blue", result.get(1).getColour());
        assertEquals(Long.valueOf(0), result.get(1).getCount());
    }

    @Test
    void testFindPdCategoryGraphDataWithMissingCategories() {
        
        Integer teamId = 1;
        List<PdCategoryGraphDataDTO> existingData = new ArrayList<>();
        when(pdCategoryRepository.findPdCategoryGraphDataByTeamId(teamId)).thenReturn(existingData);

        List<DvcatColour> mockColours = new ArrayList<>();
        mockColours.add(new DvcatColour("CategoryA", "Red"));
        mockColours.add(new DvcatColour("CategoryB", "Blue"));
        when(dvcatColourRepository.findAll()).thenReturn(mockColours);

        List<PdCategoryGraphDataDTO> result = visualisationService.findPdCategoryGraphDataByTeam(teamId);

        assertEquals(2, result.size());
        assertEquals("CategoryA", result.get(0).getDvcat());
        assertEquals("Red", result.get(0).getColour());
        assertEquals(Long.valueOf(0), result.get(0).getCount());
        assertEquals("CategoryB", result.get(1).getDvcat());
        assertEquals("Blue", result.get(1).getColour());
        assertEquals(Long.valueOf(0), result.get(1).getCount());
    }

    @Test
    void testFindPdCategoryBreakdownGraphData() {
        
        Integer teamId = 1;
        List<PdCategoryGraphDataDTO> mockCategories = new ArrayList<>();
        mockCategories.add(new PdCategoryGraphDataDTO("CategoryA", "Red", 5L));
        mockCategories.add(new PdCategoryGraphDataDTO("CategoryB", "Blue", 3L));
        when(pdCategoryRepository.findPdCategoryGraphDataByTeamId(teamId)).thenReturn(mockCategories);

        List<DvcatDvdecodRepositoryDataDTO> mockPdData = new ArrayList<>();
        mockPdData.add(new DvcatDvdecodRepositoryDataDTO("CategoryA", "DV1", 5L, "Red"));
        mockPdData.add(new DvcatDvdecodRepositoryDataDTO("CategoryB", "DV2", 3L, "Blue"));
        when(pdCategoryRepository.findPdCategoryBreakdownDataByTeamId(teamId)).thenReturn(mockPdData);

        
        DvcatDvdecodGraphDataDTO result = visualisationService.findPdCategoryBreakdownGraphDataByTeam(teamId);

        assertNotNull(result);
        assertEquals(2, result.getDvcats().size());
        assertEquals("CategoryB", result.getDvcats().get(0));
        assertEquals("CategoryA", result.getDvcats().get(1));

        List<DvcatDvdecodDTO> dvcatData = result.getData();
        assertEquals(2, dvcatData.size());
        assertEquals("DV1", dvcatData.get(0).getDvdecod());
        assertArrayEquals(new Long[]{0L, 5L}, dvcatData.get(0).getCount());
        assertEquals("DV2", dvcatData.get(1).getDvdecod());
        assertArrayEquals(new Long[]{3L, 0L}, dvcatData.get(1).getCount());
    }
}
