package org.digitalecmt.qualityassurance.service;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.dto.Data.DataDTO;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.digitalecmt.qualityassurance.model.persistence.DataEntryCategory;
import org.digitalecmt.qualityassurance.model.persistence.PdCategory;
import org.digitalecmt.qualityassurance.repository.DataEntryCategoryRepository;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvspondesRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for handling data-related operations, specifically for fetching
 * protocol deviation data.
 * 
 * <p>
 * This class interacts with the {@link DataEntryRepository} to retrieve data
 * related to protocol deviations, including support for filtering by team ID.
 * </p>
 * 
 * <p>
 * It offers methods to:
 * <ul>
 * <li>Fetch all protocol deviation data</li>
 * <li>Fetch protocol deviation data filtered by team ID</li>
 * </ul>
 * </p>
 * 
 * <p>
 * This class is annotated with {@link Service} to mark it as a Spring-managed
 * service component, and it relies on Spring's {@link Autowired} dependency
 * injection to inject the repository.
 * </p>
 */
@Service
public class DataService {

    @Autowired
    DataEntryRepository dataEntryRepository;

    @Autowired
    DvspondesRepository dvspondesRepository;

    @Autowired
    DataEntryCategoryRepository dataEntryCategoryRepository;

    @Autowired
    PdCategoryRepository pdCategoryRepository;

    /**
     * Retrieves a list of all protocol deviation data.
     * 
     * <p>
     * This method interacts with the {@link DataEntryRepository} to fetch all
     * available protocol deviation data.
     * </p>
     * 
     * <p>
     * It returns the following: study id, dvspondes, dvcat, dvdecod and dvterm.
     * </p>
     * 
     * @return a list of {@link DataDTO} containing protocol deviation data.
     */
    public List<DataDTO> getPdData() {
        return dataEntryRepository.findPdData();
    }

    /**
     * Retrieves protocol deviation data filtered by team ID.
     * 
     * <p>
     * This method retrieves data for a specific team by calling the repository
     * to query for protocol deviation data associated with the given team ID.
     * </p>
     * 
     * <p>
     * It returns the following: study id, dvspondes, dvcat, dvdecod and dvterm.
     * </p>
     * 
     * @param teamId the ID of the team for which to fetch protocol deviation data.
     * @return a list of {@link DataDTO} containing protocol deviation data filtered
     *         by the specified team ID.
     */
    public List<DataDTO> getPdDataByTeamId(Long teamId) {
        return dataEntryRepository.findPdDataByTeamId(teamId);
    }
    
    public List<DataDTO> getPdDataByStudyId(String studyId) {
        return dataEntryRepository.findPdDataByStudyId(studyId);
    }

    public void updateEntry(DataDTO data) {
        Optional<DataEntry> dataEntryRequest = dataEntryRepository.findByEntryId(Long.valueOf(data.entryId));
        if (dataEntryRequest.isPresent()) {
            DataEntry dataEntry = dataEntryRequest.get();

            dataEntry.setSiteId(data.siteId);
            dataEntry.setStudyId(data.studyId);
            dataEntryRepository.save(dataEntry);

            Integer dvspondesId = dataEntry.getDvspondesId();
            dvspondesRepository.findById(dvspondesId)
                    .get().setDvspondesValue(data.dvspondes);

            PdCategory pdCategory = pdCategoryRepository.findByDvdecod(data.dvdecod).get();
            DataEntryCategory dataEntryCategory = dataEntryCategoryRepository.findAllByEntryId(dataEntry.getEntryId()).get(0);
            dataEntryCategory.setCategoryId(pdCategory.getCategoryId());
            dataEntryCategoryRepository.save(dataEntryCategory);
        }
    }

}
