package org.digitalecmt.qualityassurance.service;

import java.util.List;

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

    /**
     * Creates a new study if it does not already exist.
     *
     * @param id the ID of the study to create
     * @return the created or existing study
     */
    public Study createStudy(String id) {
        id = id.toUpperCase();
        return studyRepository.findById(id)
                .orElse(saveStudy(id));
    }

    /**
     * Saves a new study to the repository.
     *
     * @param id the ID of the study to save
     * @return the saved study
     */
    private Study saveStudy(String id) {
        Study study = Study.builder()
                .id(id)
                .studyName("")
                .build();
        return studyRepository.save(study);
    }
}
