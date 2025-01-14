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
}
