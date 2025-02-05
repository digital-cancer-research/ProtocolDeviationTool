package org.digitalecmt.qualityassurance.service;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing studies.
 */
@Service
public class StudyService {

    @Autowired
    private StudyRepository studyRepository;

    /**
     * Retrieves all studies.
     *
     * @return a list of all studies
     */
    public List<Study> findAllStudies() {
        return studyRepository.findAll();
    }

    public Optional<Study> findStudyByExternalId(String externalStudyId) {
        return studyRepository.findByExternalStudyId(externalStudyId);
    }

    /**
     * Creates a new study if it does not already exist.
     *
     * @param id the ID of the study to create
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
     * @param id the ID of the study to save
     * @return the saved study
     */
    private Study saveStudy(String externalStudyId) {
        Study study = Study.builder()
                .externalStudyId(externalStudyId)
                .build();
        return studyRepository.save(study);
    }
}
