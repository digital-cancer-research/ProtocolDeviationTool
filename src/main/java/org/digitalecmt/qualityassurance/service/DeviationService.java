package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviationService {
    
    @Autowired
    PdCategoryRepository pdCategoryRepository;

    public List<String> getDvcats() {
        return pdCategoryRepository.findDistinctDVCat();
    }

    public List<String> getDvdecods() {
        return pdCategoryRepository.findDvdecods();
    }

    public List<String> getDvdecodsByDvcat(String dvcat) {
        return pdCategoryRepository.findDvdecodsByDvcat(dvcat.toUpperCase().trim());
    }
    
    public List<String> getDvterms() {
        return pdCategoryRepository.findDvterms();
    }

    public String getDvtermByDvdecod(String dvdecod) {
        return pdCategoryRepository.findDvtermByDvdecod(dvdecod.toUpperCase().trim());
    }
}
