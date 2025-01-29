package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Data.DataDto;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataService {

    @Autowired
    DataRepository dataRepository;

    public List<DataDto> getPdData() {
        return null;
    }

    public List<DataDto> getPdDataByTeamId(Long teamId) {
        return null;
    }

    public List<DataDto> getPdDataByStudyId(String studyId) {
        return null;
    }

    public void updateEntry(DataDto data) {
    }

    public Data saveData(Data data) {
        return dataRepository.save(data);
    }

}
