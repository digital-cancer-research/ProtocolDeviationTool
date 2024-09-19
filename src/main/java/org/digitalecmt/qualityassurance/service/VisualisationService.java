package org.digitalecmt.qualityassurance.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.model.persistence.DvcatColour;
import org.digitalecmt.qualityassurance.repository.DvcatColourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisualisationService {

    @Autowired
    private DvcatColourRepository dvcatColourRepository;

    public List<String> findCategoryColours() {
        return dvcatColourRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(DvcatColour::getDvcat))
                .map(DvcatColour::getColour)
                .collect(Collectors.toList());
    }
}
