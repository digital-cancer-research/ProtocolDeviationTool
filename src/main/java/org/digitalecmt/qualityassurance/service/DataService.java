package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.dto.Data.DataDTO;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
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

}
