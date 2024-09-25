package org.digitalecmt.qualityassurance.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
import org.digitalecmt.qualityassurance.model.persistence.DvcatColour;
import org.digitalecmt.qualityassurance.repository.DvcatColourRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class responsible for handling visualisation-related operations.
 * 
 * <p>
 * This class provides methods to retrieve category colors and PD category
 * data for specific teams from the respective repositories.
 * </p>
 */
@Service
public class VisualisationService {

    @Autowired
    private PdCategoryRepository pdCategoryRepository;

    @Autowired
    private DvcatColourRepository dvcatColourRepository;

    /**
     * Retrieves a sorted list of category colors.
     * 
     * <p>
     * This method fetches all the color entries from the DvcatColour
     * repository, sorts them by their category, and returns a list of
     * colors associated with those categories.
     * </p>
     * 
     * @return a list of strings representing the colors of categories, sorted
     *         by category name.
     */
    public List<String> findCategoryColours() {
        return dvcatColourRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(DvcatColour::getDvcat))
                .map(DvcatColour::getColour)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves PD category data for a specific team.
     * 
     * <p>
     * This method retrieves PD category data from the PdCategory repository
     * for the specified team. The data returned includes category names,
     * associated colors, and counts of related data entries.
     * Includes dvcats with a count of 0, along with their colour.
     * </p>
     * 
     * @param teamId the ID of the team for which to retrieve PD category data.
     * @return a list of PdCategoryGraphDataDTO objects containing the category
     *         data for the specified team.
     */
    public List<PdCategoryGraphDataDTO> findPdCategoryGraphData(Integer teamId) {
        List<PdCategoryGraphDataDTO> existingCategoryData = pdCategoryRepository.findPdCategoryGraphData(teamId);
        return fillInMissingPdCategoryGraphData(existingCategoryData);
    }

    /**
     * Fills in missing PD category data by adding categories with zero counts.
     * 
     * <p>
     * This method checks for any PD categories that are present in the system
     * but do not appear in the existing data set. For each missing category,
     * it adds a new {@code PdCategoryGraphDataDTO} with a count of 0 and the
     * corresponding color. This ensures that the result includes all categories,
     * even if they have no associated data entries.
     * </p>
     * 
     * @param existingData the list of {@code PdCategoryGraphDataDTO} objects
     *                     representing the current PD category data for a team.
     * @return a list of {@code PdCategoryGraphDataDTO} objects, including the
     *         original data plus any missing categories with a count of 0.
     */
    private List<PdCategoryGraphDataDTO> fillInMissingPdCategoryGraphData(List<PdCategoryGraphDataDTO> existingData) {
        List<DvcatColour> allDvcatColours = dvcatColourRepository.findAll();
        List<String> dvcatsInExistingData = existingData.stream()
                .map(categoryData -> categoryData.getDvcat())
                .collect(Collectors.toList());

        for (DvcatColour dvcatColour : allDvcatColours) {
            String dvcat = dvcatColour.getDvcat();
            String colour = dvcatColour.getColour();
            if (!dvcatsInExistingData.contains(dvcat)) {
                existingData.add(new PdCategoryGraphDataDTO(dvcat, colour, Long.valueOf(0)));
            }
        }
        return existingData;
    }
}
