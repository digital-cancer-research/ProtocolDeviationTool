package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.models.entities.DataCategory;
import org.digitalecmt.qualityassurance.models.entities.DataSubCategory;
import org.digitalecmt.qualityassurance.models.entities.Dvcat;
import org.digitalecmt.qualityassurance.models.entities.Dvdecod;
import org.digitalecmt.qualityassurance.repository.DataCategoryRepository;
import org.digitalecmt.qualityassurance.repository.DataSubCategoryRepository;
import org.digitalecmt.qualityassurance.repository.DvcatRepository;
import org.digitalecmt.qualityassurance.repository.DvdecodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing deviations.
 */
@Service
public class DeviationService {

    @Autowired
    DataCategoryRepository dataCategoryRepository;

    @Autowired
    DataSubCategoryRepository dataSubCategoryRepository;

    @Autowired
    DvcatRepository dvcatRepository;

    @Autowired
    DvdecodRepository dvdecodRepository;

    public List<String> getDvcats() {
        return null;
    }

    public List<String> getDvdecods() {
        return null;
    }

    public List<String> getDvdecodsByDvcat(String dvcat) {
        return null;
    }

    public List<String> getDvterms() {
        return null;
    }

    public String getDvtermByDvdecod(String dvdecod) {
        return null;
    }

    /**
     * Categorises the data based on the provided DV categories and DV decodes.
     *
     * @param dvcats the list of DV categories
     * @param dvdecods the list of DV decodes
     * @param dataId the ID of the data
     * @return true if all categories and decodes are valid, false otherwise
     */
    public boolean categoriseData(List<String> dvcats, List<String> dvdecods, Long dataId) {
        List<Dvcat> validDvcats = validateDvcats(dvcats);
        List<DataCategory> categories = saveDvcatCategorisation(validDvcats, dataId);
        List<DataSubCategory> validDvdecods = validateAndSaveDvdecodCategorisation(dvdecods, categories);
        return (dvcats.size() == validDvcats.size()) & (dvdecods.size() == validDvdecods.size());
    }

    /**
     * Validates the provided DV categories.
     *
     * @param dvcats the list of DV categories
     * @return the list of valid DV categories
     */
    public List<Dvcat> validateDvcats(List<String> dvcats) {
        List<Dvcat> validDvcats = new ArrayList<>();
        dvcats.forEach(description -> {
            Optional<Dvcat> dvcat = getDvcatByDescription(description);
            dvcat.ifPresent(d -> validDvcats.add(d));
        });
        return validDvcats;
    }

    /**
     * Saves the categorisation of DV categories.
     *
     * @param dvcats the list of DV categories
     * @param dataId the ID of the data
     * @return the list of saved data categories
     */
    private List<DataCategory> saveDvcatCategorisation(List<Dvcat> dvcats, Long dataId) {
        dvcats.forEach(dvcat -> {
            DataCategory category = DataCategory.builder()
                    .dataId(dataId)
                    .dvcatId(dvcat.getId())
                    .build();
            dataCategoryRepository.save(category);
        });
        return dataCategoryRepository.findAllByDataId(dataId);
    }

    /**
     * Validates and saves the categorisation of DV decodes.
     *
     * @param dvdecods the list of DV decodes
     * @param categories the list of data categories
     * @return the list of saved data subcategories
     */
    private List<DataSubCategory> validateAndSaveDvdecodCategorisation(List<String> dvdecods,
            List<DataCategory> categories) {

        List<DataSubCategory> validSubCategories = new ArrayList<>();
        List<Long> dvcatIds = categories.stream()
                .map(DataCategory::getDvcatId)
                .collect(Collectors.toList());

        dvdecods.forEach(description -> {
            Optional<Dvdecod> dvdecod = getDvdecodByDescription(description);

            dvdecod.ifPresent(d -> {
                Long dvcatId = d.getDvcatId();
                Integer index = dvcatIds.indexOf(dvcatId);

                if (index != -1) {
                    DataCategory category = categories.get(index);
                    DataSubCategory subCategory = saveDvdecodCategorisation(d, category);
                    validSubCategories.add(subCategory);
                }
            });
        });
        return validSubCategories;
    }

    /**
     * Saves the categorisation of a DV decode.
     *
     * @param dvdecod the DV decode entity
     * @param category the data category
     * @return the saved data subcategory
     */
    private DataSubCategory saveDvdecodCategorisation(Dvdecod dvdecod, DataCategory category) {
        DataSubCategory dataSubCategory = DataSubCategory.builder()
                .dataCategoryId(category.getId())
                .dvdecodId(dvdecod.getId())
                .build();
        return dataSubCategoryRepository.save(dataSubCategory);
    }

    /**
     * Retrieves a DV category by its description.
     *
     * @param description the description of the DV category
     * @return an Optional containing the found DV category, or empty if not found
     */
    public Optional<Dvcat> getDvcatByDescription(String description) {
        return getByDescription(description, dvcatRepository::findByDescription);
    }

    /**
     * Retrieves a DV decode by its description.
     *
     * @param description the description of the DV decode
     * @return an Optional containing the found DV decode, or empty if not found
     */
    public Optional<Dvdecod> getDvdecodByDescription(String description) {
        return getByDescription(description, dvdecodRepository::findByDescription);
    }

    /**
     * Retrieves an entity by its description using the provided finder function.
     *
     * @param <T> the type of the entity
     * @param description the description of the entity
     * @param finder the function to find the entity by description
     * @return an Optional containing the found entity, or empty if not found
     */
    private <T> Optional<T> getByDescription(String description, Function<String, Optional<T>> finder) {
        return finder.apply(description.trim().toUpperCase());
    }

}
