package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudiesDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvdecodPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvdecodPerStudySpareDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatPerDvdecodDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerStudyDto;
import org.digitalecmt.qualityassurance.models.entities.Dvcat;
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
    public PdsPerDvcatPerStudyDto getPdsPerDvcatPerStudy(Long teamId) {

        List<Study> studies = studyService.findAllStudiesOrderedByDvcatCount(teamId);
        HashMap<String, DvcatPerStudiesDto> dataMap = new HashMap<String, DvcatPerStudiesDto>();

        studies.forEach(study -> {
            List<DvcatPerStudyDto> studyBreakdownByDvcat = dataRepository.findDvcatsPerStudyId(study.getId());
            studyBreakdownByDvcat.forEach(breakdown -> {
                String dvcat = breakdown.getDvcat();
                DvcatPerStudiesDto data = dataMap.get(dvcat);
                if (data != null) {
                    data.getCount().add(breakdown.getCount());
                } else {
                    data = DvcatPerStudiesDto.builder()
                            .dvcat(dvcat)
                            .count(new ArrayList<Long>())
                            .colour(breakdown.getColour())
                            .build();
                    data.getCount().add(breakdown.getCount());
                    dataMap.put(dvcat, data);
                }
            });
        });

        PdsPerDvcatPerStudyDto data = PdsPerDvcatPerStudyDto.builder()
                .data(new ArrayList<DvcatPerStudiesDto>(dataMap.values()))
                .studies(studies.stream().map(Study::getExternalStudyId).collect(Collectors.toList()))
                .build();
        return data;
    }

    /**
     * Retrieves the PDs per DV category per DVDECOD for a given team.
     *
     * @param teamId the ID of the team
     * @return the PDs per DV category per DVDECOD
     */
    public PdsPerDvcatPerDvdecodDto getPdsPerDvcatPerDvdecodDto(Long teamId) {
        List<Dvcat> sortedDvcats = dataRepository.findDvcatsSortedByDvdecodCountAndTeamId(teamId);
        List<DvdecodPerStudySpareDto> data = new ArrayList<>();

        for (int i = 0; i < sortedDvcats.size(); i++) {
            final int index = i;
            Dvcat dvcat = sortedDvcats.get(index);
            List<DvdecodPerStudyDto> dvdecods = dataRepository.findDvdecodByDvcatIdPerStudy(dvcat.getId(), teamId);
            dvdecods.forEach(dvdecod -> {
                DvdecodPerStudySpareDto dataItem = DvdecodPerStudySpareDto.builder()
                        .dvcat(dvdecod.getDvcat())
                        .dvdecod(dvdecod.getDvdecod())
                        .colour(dvdecod.getColour())
                        .build();
                ArrayList<Long> sparseCount = new ArrayList<>(Collections.nCopies(10, 0L));
                sparseCount.set(index, dvdecod.getCount());
                dataItem.setCount(sparseCount);
                data.add(dataItem);
            });
        }
        PdsPerDvcatPerDvdecodDto dto = PdsPerDvcatPerDvdecodDto.builder()
                .dvcats(
                        sortedDvcats.stream()
                                .map(Dvcat::getDescription)
                                .collect(Collectors.toList()))
                .data(data)
                .build();
        return dto;
    }

}