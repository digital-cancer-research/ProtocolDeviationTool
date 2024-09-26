package org.digitalecmt.qualityassurance.controller.entity;

import org.digitalecmt.qualityassurance.dto.TeamWithStudiesDTO;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.model.persistence.TeamStudyAccess;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.TeamStudyAccessRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class TeamControllerTest {

    private MockMvc mockMvc;

    @Mock
    private TeamRepository teamRepository;

    @Mock
    private TeamStudyAccessRepository teamStudyAccessRepository;

    @InjectMocks
    private TeamController teamController;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(teamController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testGetTeams() throws Exception {
        Team team1 = new Team();
        team1.setTeamId(1);
        Team team2 = new Team();
        team2.setTeamId(2);

        when(teamRepository.findAll()).thenReturn(Arrays.asList(team1, team2));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/teams")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].teamId").value(1))
                .andExpect(jsonPath("$[1].teamId").value(2));

        verify(teamRepository, times(1)).findAll();
    }

    @Test
    public void testGetTeamStudyAccessWhenTeamIdsAreProvided() throws Exception {
        Team team1 = new Team();
        team1.setTeamId(1);
        Team team2 = new Team();
        team2.setTeamId(2);
        Integer teamId = 1;
        TeamWithStudiesDTO dto = TeamWithStudiesDTO.fromStringList(teamId, Arrays.asList("study1", "study2"));
        when(teamStudyAccessRepository.findTeamStudiesByTeamId(teamId)).thenReturn(dto.getStudies().stream().map(study -> study.getStudyId()).collect(Collectors.toList()));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/teams/team-study-access")
                .param("teamIds", "1")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].teamId").value(1))
                .andExpect(jsonPath("$[0].studyIds[0]").value("study1"))
                .andExpect(jsonPath("$[0].studyIds[1]").value("study2"));

        verify(teamStudyAccessRepository, times(1)).findTeamStudiesByTeamId(teamId);
    }

    @Test
    public void testGiveTeamAccessToStudy() throws Exception {
        TeamWithStudiesDTO dto = TeamWithStudiesDTO.fromStringList(1, Arrays.asList("study1", "study2"));
        String jsonRequest = objectMapper.writeValueAsString(Collections.singletonList(dto));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/teams/team-study-access")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))
                .andExpect(status().isCreated());

        verify(teamStudyAccessRepository, times(2)).save(any(TeamStudyAccess.class));
    }
}
