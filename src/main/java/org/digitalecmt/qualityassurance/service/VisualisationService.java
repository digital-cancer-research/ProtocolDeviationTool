package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudies;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudy;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatPerStudy;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerStudyDto;
import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing visualisation data.
 */
@Service
public class VisualisationService {

    @Autowired
    DataRepository dataRepository;

    @Autowired
    StudyService studyService;

    /**
     * Retrieves the count of PDs for a given team.
     *
     * @param teamId the ID of the team
     * @return the count of PDs
     */
    public long getPdCount(Long teamId) {
        return dataRepository.countByTeamId(teamId);
    }

    /**
     * Retrieves the PDs per DV category for a given team.
     *
     * @param teamId the ID of the team
     * @return a list of PDs per DV category
     */
    public List<PdsPerDvcatDto> getPdsPerDvcat(Long teamId) {
        List<PdsPerDvcatDto> data = dataRepository.findPdsPerDvcatDtoByTeamId(teamId);
        return data;
    }

    /**
     * Retrieves the PDs per study for a given team.
     *
     * @param teamId the ID of the team
     * @return a list of PDs per study
     */
    public List<PdsPerStudyDto> getPdsPerStudy(Long teamId) {
        List<PdsPerStudyDto> data = dataRepository.findPdsPerStudyDtosByTeamId(teamId);
        return data;
    }

    /**
     * Retrieves the PDs per DV category per study for a given team.
     *
     * @param teamId the ID of the team
     * @return the PDs per DV category per study
     */
    public PdsPerDvcatPerStudy getPdsPerDvcatPerStudy(Long teamId) {

        List<Study> studies = studyService.findAllStudiesOrderedByDvcatCount(teamId);
        HashMap<String, DvcatPerStudies> dataMap = new HashMap<String, DvcatPerStudies>();
        
        studies.forEach(study -> {
            List<DvcatPerStudy> studyBreakdownByDvcat = dataRepository.findDvcatsPerStudyId(study.getId());
            studyBreakdownByDvcat.forEach(breakdown -> {
                String dvcat = breakdown.getDvcat();
                DvcatPerStudies data = dataMap.get(dvcat);
                if (data != null) {
                    data.getCount().add(breakdown.getCount());
                } else {
                    data = DvcatPerStudies.builder()
                            .dvcat(dvcat)
                            .count(new ArrayList<Long>())
                            .colour(breakdown.getColour())
                            .build();
                    data.getCount().add(breakdown.getCount());
                    dataMap.put(dvcat, data);
                }
            });
        });

        PdsPerDvcatPerStudy data = PdsPerDvcatPerStudy.builder()
                .data(new ArrayList<DvcatPerStudies>(dataMap.values()))
                .studies(studies.stream().map(Study::getExternalStudyId).collect(Collectors.toList()))
                .build();
        return data;
    }

}