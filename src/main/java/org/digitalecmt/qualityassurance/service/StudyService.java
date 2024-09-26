package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.repository.TeamStudyAccessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudyService {
    
    @Autowired
    private TeamStudyAccessRepository teamStudyAccessRepository;

    public List<String> getAllStudyIdsByTeam(Integer teamId) {
        List<String> studies = teamStudyAccessRepository.findTeamStudiesByTeamId(teamId);
        return studies;
    }
}
