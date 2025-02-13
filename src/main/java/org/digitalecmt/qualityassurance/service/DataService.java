package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto;
import org.digitalecmt.qualityassurance.models.dto.Data.CategorisationDto;
import org.digitalecmt.qualityassurance.models.dto.Data.DataDto;
import org.digitalecmt.qualityassurance.models.dto.Data.DataUpdateDto;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.models.entities.DataAudit;
import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.models.pojo.DataEntry;
import org.digitalecmt.qualityassurance.repository.DataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DataService {

    @Autowired
    private DataRepository dataRepository;
    
    @Autowired
    private DeviationService deviationService;

    @Autowired
    private DataAuditService dataAuditService;

    @Autowired
    private StudyService studyService;

    public List<DataDto> getPdDataByTeamId(Long teamId) {
        List<BaseDataDto> baseData = dataRepository.findDataByTeam(teamId);
        return getDataDetails(baseData);
    }

    public List<DataDto> getPdDataByStudy(String study) {
        List<BaseDataDto> baseData = dataRepository.findDataByStudy(study);
        return getDataDetails(baseData);
    }

    public List<DataDto> getDataDetails(List<BaseDataDto> data) {
        List<DataDto> formattedData = new ArrayList<>();
        data.forEach(d -> {
            List<CategorisationDto> categories = dataRepository.findCategorisationByDataId(d.getId());
            List<List<String>> extractedData = List.of(
                    categories.stream().map(CategorisationDto::getDvcats).filter(Objects::nonNull).toList(),
                    categories.stream().map(CategorisationDto::getDvdecods).filter(Objects::nonNull).toList(),
                    categories.stream().map(CategorisationDto::getDvterms).filter(Objects::nonNull).toList());

            DataDto formattedDatum = DataDto.builder()
                    .id(d.getId())
                    .siteId(d.getSiteId())
                    .studyId(d.getStudyId())
                    .dvspondes(d.getDvspondes())
                    .dvcat(extractedData.get(0))
                    .dvdecod(extractedData.get(1))
                    .dvterm(extractedData.get(2))
                    .build();

            formattedData.add(formattedDatum);
        });
        return formattedData;
    }

    @Transactional
    public void updateEntry(DataUpdateDto dataDto) {
        DataDto originalData = getDataDetails(dataRepository.findDataById(dataDto.getId())).get(0);
        
        deviationService.removeCategorisation(dataDto.getId());
        deviationService.categoriseData(dataDto.getDvcat(), dataDto.getDvdecod(), dataDto.getId());
        Study study = studyService.createStudy(dataDto.getStudyId());
        Data data = dataRepository.findById(dataDto.getId()).get();
        data.setStudyId(study.getId());
        dataRepository.save(data);


        DataAudit audit = DataAudit.builder()
        .dataId(dataDto.getId())
        .userId(dataDto.getAdminId())
        .originalValue(
            "DVCAT: " + originalData.getDvcat() + "\n" +
            "DVDECOD: " + originalData.getDvdecod()
        )
        .newValue(
            "DVCAT: " + dataDto.getDvcat() + "\n" +
            "DVDECOD: " + dataDto.getDvdecod()
        )
        .build();
        dataAuditService.saveAudit(audit);
    }

    public Data saveData(Data data) {
        return dataRepository.save(data);
    }

    public Data toData(DataEntry entry, Long fileId, Long mappingId, Long studyId) {
        return Data.builder()
                .fileId(fileId)
                .mappingId(mappingId)
                .studyId(studyId)
                .dvspondes(entry.getDvspondes())
                .build();
    }
}
