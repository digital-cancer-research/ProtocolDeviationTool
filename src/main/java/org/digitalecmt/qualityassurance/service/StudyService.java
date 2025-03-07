package org.digitalecmt.qualityassurance.service;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.TeamStudy;
import org.digitalecmt.qualityassurance.repository.StudyRepository;
import org.digitalecmt.qualityassurance.repository.TeamStudyRepository;
import org.digitalecmt.qualityassurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing studies.
 */
@Service
public class StudyService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private TeamStudyRepository teamStudyRepository;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private SystemEntityService systemEntityService;

    public List<Study> findAllStudies(Long teamId) {
        return studyRepository.findAll(teamId);
    }

    public List<Study> findAllStudiesByIds(List<Long> studyIds) {
        List<Study> studies = studyIds.stream()
                .map(id -> findById(id).orElseGet(null))
                .filter(study -> study != null)
                .toList();
        return studies;
    }

    /**
     * Retrieves all studies ordered by DV category count for a given team.
     *
     * @param teamId the ID of the team
     * @return a list of studies ordered by DV category count
     */
    public List<Study> findAllStudiesOrderedByDvcatCount(Long teamId) {
        return studyRepository.findAllStudiesOrderedByDvcatCount(teamId);
    }

    public Optional<Study> findById(Long studyId) {
        return studyRepository.findById(studyId);
    }

    /**
     * Finds a study by its external study ID.
     *
     * @param externalStudyId the external study ID of the study to find
     * @return an Optional containing the found study, or empty if not found
     */
    public Optional<Study> findStudyByExternalId(String externalStudyId) {
        return studyRepository.findByExternalStudyId(externalStudyId);
    }

    /**
     * Creates a new study if it does not already exist.
     *
     * @param externalId the external ID of the study to create
     * @return the created or existing study
     */
    public Study createStudy(String externalId) {
        final String formattedId = externalId.toUpperCase().trim();

        return studyRepository.findByExternalStudyId(formattedId)
                .orElseGet(() -> {
                    return saveStudy(formattedId);
                });
    }

    /**
     * Saves a new study to the repository.
     *
     * @param externalStudyId the external study ID of the study to save
     * @return the saved study
     */
    private Study saveStudy(String externalStudyId) {
        Study study = Study.builder()
                .externalStudyId(externalStudyId)
                .build();
        Study savedStudy = studyRepository.save(study);
        addStudyToAllDataTeam(savedStudy);
        return savedStudy;
    }

    private void addStudyToAllDataTeam(Study study) {
        Team team = systemEntityService.getAllDataTeam();
        TeamStudy id = TeamStudy.builder()
                .teamId(team.getId())
                .studyId(study.getId())
                .build();
        teamStudyRepository.save(id);
    }
}
