package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.dto.Visualisation.CountPerStudyDto;
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodGraphDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodRepositoryDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.StudyBreakdownDataDto;
import org.digitalecmt.qualityassurance.dto.Visualisation.StudyBreakdownDto;
import org.digitalecmt.qualityassurance.dto.Visualisation.StudyBreakdownRepositoryDataDto;
import org.digitalecmt.qualityassurance.model.persistence.DvcatColour;
import org.digitalecmt.qualityassurance.repository.BarChartColoursRepository;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.DvcatColourRepository;
import org.digitalecmt.qualityassurance.repository.PdCategoryRepository;
import org.digitalecmt.qualityassurance.repository.TeamStudyAccessRepository;
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

    @Autowired
    private BarChartColoursRepository barChartColoursRepository;

    @Autowired
    private DataEntryRepository dataEntryRepository;

    @Autowired
    private TeamStudyAccessRepository teamStudyAccessRepository;

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
    public List<PdCategoryGraphDataDTO> findPdCategoryGraphDataByTeam(Integer teamId) {
        List<PdCategoryGraphDataDTO> existingCategoryData = pdCategoryRepository
                .findPdCategoryGraphDataByTeamId(teamId);
        return fillInMissingPdCategoryGraphData(existingCategoryData);
    }

    public List<PdCategoryGraphDataDTO> findPdCategoryGraphDataByStudy(String studyId) {
        List<PdCategoryGraphDataDTO> existingCategoryData = pdCategoryRepository
                .findPdCategoryGraphDataByStudyId(studyId);
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

    /**
     * Retrieves protocol deviation category breakdown graph data for a given team.
     * This is data formatted for a stacked bar graph in chart.js.
     *
     * @param teamId the ID of the team for which the data is retrieved.
     * @return DvcatDvdecodGraphDataDTO containing the list of DVCATs and the
     *         breakdown data for each.
     */
    public DvcatDvdecodGraphDataDTO findPdCategoryBreakdownGraphDataByTeam(Integer teamId) {
        List<PdCategoryGraphDataDTO> pdCategories = getSortedPdCategories(teamId);
        List<String> dvcats = extractDvcats(pdCategories);
        Integer numberOfDvcats = dvcats.size();

        List<DvcatDvdecodRepositoryDataDTO> pdData = pdCategoryRepository.findPdCategoryBreakdownDataByTeamId(teamId);
        List<DvcatDvdecodDTO> dvcatDvdecodData = mapPdDataToDvcatDvdecodDTO(pdData, dvcats, numberOfDvcats);

        dvcatDvdecodData.sort(Comparator.comparing(DvcatDvdecodDTO::getTotalCount).reversed());
        return new DvcatDvdecodGraphDataDTO(dvcats, dvcatDvdecodData);
    }

    /**
     * Retrieves protocol deviation category breakdown graph data for a given study.
     * This is data formatted for a stacked bar graph in chart.js.
     *
     * @param studyId the ID of the study for which the data is retrieved.
     * @return DvcatDvdecodGraphDataDTO containing the list of DVCATs and the
     *         breakdown data for each.
     */
    public DvcatDvdecodGraphDataDTO findPdCategoryBreakdownGraphDataByStudy(String studyId) {
        List<PdCategoryGraphDataDTO> pdCategories = getSortedPdCategories(studyId);
        List<String> dvcats = extractDvcats(pdCategories);
        Integer numberOfDvcats = dvcats.size();

        List<DvcatDvdecodRepositoryDataDTO> pdData = pdCategoryRepository.findPdCategoryBreakdownDataByStudyId(studyId);
        List<DvcatDvdecodDTO> dvcatDvdecodData = mapPdDataToDvcatDvdecodDTO(pdData, dvcats, numberOfDvcats);

        dvcatDvdecodData.sort(Comparator.comparing(DvcatDvdecodDTO::getTotalCount).reversed());
        return new DvcatDvdecodGraphDataDTO(dvcats, dvcatDvdecodData);
    }

    /**
     * Retrieves and sorts protocol deviation categories by count for a given team.
     *
     * @param teamId the ID of the team for which to retrieve categories.
     * @return a sorted list of PdCategoryGraphDataDTO.
     */
    private List<PdCategoryGraphDataDTO> getSortedPdCategories(Integer teamId) {
        List<PdCategoryGraphDataDTO> pdCategories = findPdCategoryGraphDataByTeam(teamId);
        pdCategories.sort(Comparator.comparing(PdCategoryGraphDataDTO::getCount));
        return pdCategories;
    }

    /**
     * Retrieves and sorts protocol deviation categories by count for a given study.
     *
     * @param studyId the ID of the study for which to retrieve categories.
     * @return a sorted list of PdCategoryGraphDataDTO.
     */
    private List<PdCategoryGraphDataDTO> getSortedPdCategories(String studyId) {
        List<PdCategoryGraphDataDTO> pdCategories = findPdCategoryGraphDataByStudy(studyId);
        pdCategories.sort(Comparator.comparing(PdCategoryGraphDataDTO::getCount));
        return pdCategories;
    }

    /**
     * Extracts the list of DVCATs from the provided list of protocol deviation
     * categories.
     *
     * @param pdCategories the list of protocol deviation categories.
     * @return a list of DVCAT strings.
     */
    private List<String> extractDvcats(List<PdCategoryGraphDataDTO> pdCategories) {
        return pdCategories.stream()
                .map(PdCategoryGraphDataDTO::getDvcat)
                .collect(Collectors.toList());
    }

    /**
     * Maps protocol deviation repository data to a list of DvcatDvdecodDTO objects.
     *
     * @param pdData         the protocol deviation repository data.
     * @param dvcats         the list of DVCATs.
     * @param numberOfDvcats the total number of DVCATs.
     * @return a list of DvcatDvdecodDTO objects.
     */
    private List<DvcatDvdecodDTO> mapPdDataToDvcatDvdecodDTO(List<DvcatDvdecodRepositoryDataDTO> pdData,
            List<String> dvcats, Integer numberOfDvcats) {
        return pdData.stream().map(data -> {
            Long[] count = initialiseCountArray(dvcats, data.getDvcat(), data.getCount(), numberOfDvcats);
            return new DvcatDvdecodDTO(data.getDvcat(), data.getDvdecod(), count, data.getColour());
        }).collect(Collectors.toList());
    }

    /**
     * Initialises the count array for a DVCAT by placing the entry count in the
     * correct position.
     * The count for other DVCATs is set to zero.
     *
     * @param dvcats         the list of all DVCATs.
     * @param dvcat          the current DVCAT for the data entry.
     * @param entryCount     the count of the current DVCAT.
     * @param numberOfDvcats the total number of DVCATs.
     * @return an array of counts, with the count for the current DVCAT and zeroes
     *         for others.
     */
    private Long[] initialiseCountArray(List<String> dvcats, String dvcat, Long entryCount, Integer numberOfDvcats) {
        Long[] count = new Long[numberOfDvcats];
        Integer index = dvcats.indexOf(dvcat);

        for (int i = 0; i < numberOfDvcats; i++) {
            count[i] = (i == index) ? entryCount : 0L;
        }
        return count;
    }

    /**
     * Retrieves a list of bar chart colours from the database.
     * 
     * <p>
     * This method fetches all the bar chart colours from the
     * {@code BarChartColoursRepository} and returns them as a list of strings.
     * The colours are used to visually distinguish different categories in
     * various visualisation components.
     * </p>
     * 
     * @return a list of strings representing the bar chart colours.
     */
    public List<String> getBarChartColours() {
        return barChartColoursRepository
                .findAll()
                .stream()
                .map(colour -> colour.getColour())
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a list of distinct protocol deviation categories from the database.
     * 
     * <p>
     * This method fetches all distinct DVCAT (protocol deviation category) entries
     * from the {@code PdCategoryRepository} and returns them as a list of strings.
     * These categories are used to categorize protocol deviation data in various
     * visualisation components.
     * </p>
     * 
     * @return a list of strings representing the distinct protocol deviation
     *         categories.
     */
    public List<String> getPdCategories() {
        return pdCategoryRepository.findDistinctDVCat();
    }

    /**
     * Retrieves a list of count data per study from the data entry repository.
     * 
     * <p>
     * This method fetches the count of entries for each study from the data entry
     * repository.
     * It can be used to get an overview of the distribution of entries across
     * different studies.
     * </p>
     * 
     * @return A list of {@link CountPerStudyDto} objects, where each object
     *         contains
     *         the study identifier and the count of entries for that study.
     */
    public List<CountPerStudyDto> getCountPerStudy() {
        return dataEntryRepository.findCountPerStudy();
    };

    /**
     * Retrieves a list of count data per study for a specific team.
     * 
     * <p>
     * This method fetches the count of entries for each study associated with the
     * specified team
     * from the data entry repository. It can be used to get an overview of the
     * distribution of
     * entries across different studies for a particular team.
     * </p>
     * 
     * @param teamId The unique identifier of the team for which to retrieve the
     *               count data.
     * @return A list of {@link CountPerStudyDto} objects, where each object
     *         contains
     *         the study identifier and the count of entries for that study,
     *         specifically
     *         for the given team.
     */
    public List<CountPerStudyDto> getCountPerStudy(Long teamId) {
        return dataEntryRepository.findCountPerStudyByTeam(teamId);
    };

    /**
     * Retrieves a list of count data for a specific study.
     * 
     * <p>
     * This method fetches the count of entries for the specified study
     * from the data entry repository. It can be used to get detailed information
     * about the number of entries for a particular study.
     * </p>
     * 
     * @param studyId The unique identifier of the study for which to retrieve the
     *                count data.
     * @return A list of {@link CountPerStudyDto} objects, where each object
     *         contains
     *         the study identifier and the count of entries for that study. In this
     *         case,
     *         the list will typically contain only one element since it's for a
     *         specific study.
     */
    public List<CountPerStudyDto> getCountPerStudy(String studyId) {
        return dataEntryRepository.findCountPerStudyByStudy(studyId);
    };

    /**
     * Retrieves a StudyBreakdownDataDto object containing breakdown data for all
     * studies.
     * 
     * <p>
     * This method fetches all distinct study IDs from the data entry repository,
     * retrieves the breakdown data for these studies, and returns it in a
     * structured format.
     * The list of studies is sorted before being returned.
     * </p>
     * 
     * @return A StudyBreakdownDataDto object containing:
     *         - A sorted list of all distinct study IDs
     *         - The corresponding breakdown data for each study
     */
    public StudyBreakdownDataDto getStudyBreakdownDataDto() {
        List<String> studies = dataEntryRepository.findDistinctStudyIds();
        StudyBreakdownDataDto data = StudyBreakdownDataDto.builder()
                .studies(studies)
                .data(getStudyData(studies))
                .build();
        Collections.sort(studies);
        return data;
    }

    /**
     * Retrieves a StudyBreakdownDataDto object containing breakdown data for
     * studies associated with a specific team.
     * 
     * <p>
     * This method fetches all study IDs associated with the given team from the
     * team study access repository,
     * retrieves the breakdown data for these studies, and returns it in a
     * structured format.
     * The list of studies is sorted before being returned.
     * </p>
     * 
     * @param teamId The unique identifier of the team for which to retrieve the
     *               study breakdown data.
     * @return A StudyBreakdownDataDto object containing:
     *         - A sorted list of study IDs associated with the specified team
     *         - The corresponding breakdown data for each study
     */
    public StudyBreakdownDataDto getStudyBreakdownDataDtoByTeam(Integer teamId) {
        List<String> studies = teamStudyAccessRepository.findTeamStudiesByTeamId(teamId);
        StudyBreakdownDataDto data = StudyBreakdownDataDto.builder()
                .studies(studies)
                .data(getStudyData(studies))
                .build();
        Collections.sort(studies);
        return data;
    }

    /**
     * Retrieves a StudyBreakdownDataDto object containing breakdown data for a
     * specific study.
     * 
     * <p>
     * This method creates a list containing only the specified study ID,
     * retrieves the breakdown data for this study, and returns it in a structured
     * format.
     * The list of studies (containing only one study in this case) is sorted before
     * being returned.
     * </p>
     * 
     * @param studyId The unique identifier of the study for which to retrieve the
     *                breakdown data.
     * @return A StudyBreakdownDataDto object containing:
     *         - A sorted list with a single study ID (the one specified)
     *         - The corresponding breakdown data for the specified study
     */
    public StudyBreakdownDataDto getStudyBreakdownDataDtoByStudy(String studyId) {
        List<String> studies = new ArrayList<>();
        studies.add(studyId);
        StudyBreakdownDataDto data = StudyBreakdownDataDto.builder()
                .studies(studies)
                .data(getStudyData(studies))
                .build();
        Collections.sort(studies);
        return data;
    }

    /**
     * Generates a list of StudyBreakdownDto objects based on the provided list of
     * study IDs.
     * This method processes the study data, aggregating counts for each DVCAT
     * (Deviation Category)
     * across all specified studies.
     *
     * @param studies A list of study IDs for which to generate the breakdown data.
     * @return A list of StudyBreakdownDto objects, each representing a unique DVCAT
     *         with its count across all specified studies and associated color.
     *         The list contains one entry per unique DVCAT found in the data.
     */
    private List<StudyBreakdownDto> getStudyData(List<String> studies) {
        List<StudyBreakdownRepositoryDataDto> reposData = dataEntryRepository.findStudyBreakdownData().stream()
                .filter(data -> studies.contains(data.getStudyId())).collect(Collectors.toList());

        Set<String> dvcats = new HashSet<>();
        List<StudyBreakdownDto> breakdowns = new ArrayList<>();

        for (StudyBreakdownRepositoryDataDto data : reposData) {
            String dvcat = data.getDvcat();
            if (!dvcats.contains(dvcat)) {
                dvcats.add(dvcat);
                List<Long> count = new ArrayList<>(Collections.nCopies(studies.size(), 0L));
                count.set(studies.indexOf(data.getStudyId()), data.getCount());
                StudyBreakdownDto studyBreakdown = StudyBreakdownDto.builder()
                        .dvcat(dvcat)
                        .count(count)
                        .colour(dvcatColourRepository.findById(dvcat).get().getColour())
                        .build();
                breakdowns.add(studyBreakdown);
            } else {
                StudyBreakdownDto studyBreakdown = breakdowns.stream().filter(sb -> sb.getDvcat().equals(dvcat))
                        .findFirst().get();
                studyBreakdown.getCount().set(studies.indexOf(data.getStudyId()), data.getCount());
            }
        }
        return breakdowns;
    }
}