package org.digitalecmt.qualityassurance.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.File.FileUploadDto;
import org.apache.commons.io.FilenameUtils;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.models.entities.DataCategory;
import org.digitalecmt.qualityassurance.models.entities.Dvdecod;
import org.digitalecmt.qualityassurance.models.entities.File;
import org.digitalecmt.qualityassurance.models.pojo.DataEntry;
import org.digitalecmt.qualityassurance.repository.DataCategoryRepository;
import org.digitalecmt.qualityassurance.repository.DvdecodRepository;
import org.digitalecmt.qualityassurance.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.CsvToBeanBuilder;

import jakarta.transaction.Transactional;

/**
 * Service class for managing files.
 */
@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private DataService dataService;

    @Autowired
    private SiteService siteService;

    @Autowired
    private DataCategoryRepository dataCategoryRepository;

    @Autowired
    private DvdecodRepository dvdecodRepository;

    @Autowired
    private StudyService studyService;

    /**
     * Retrieves all files.
     *
     * @return a list of all files
     */
    public List<File> findAllFiles() {
        return fileRepository.findAll();
    }

    /**
     * Finds a file by its ID.
     *
     * @param id the ID of the file to find
     * @return the found file, or null if not found
     */
    public File findById(Long id) {
        return fileRepository.findById(id).orElse(null);
    }

    /**
     * Deletes a file by its ID.
     *
     * @param file the data transfer object containing the file ID
     */
    public void deleteFile(Long id) {
        fileRepository.deleteById(id);
    }

    /**
     * Uploads a file and processes its content.
     *
     * @param fileDto the data transfer object containing the file details
     * @return the uploaded file
     */
    @Transactional
    public File uploadFile(FileUploadDto fileDto) {
        try {
            File file = saveFile(fileDto);
            parseFile(fileDto.getFile(), file.getId());
        } catch (FileNotFoundException e) {
            // Handle exception
        } catch (IllegalStateException e) {
            // Handle exception
        } catch (IOException e) {
            // Handle exception
        } catch (Exception e) {
            // Handle exception
        }
        return null;
    }

    /**
     * Saves a new file.
     *
     * @param fileDto the data transfer object containing the file details
     * @return the saved file
     */
    private File saveFile(FileUploadDto fileDto) {
        File file = fileDto.toFile();
        return fileRepository.save(file);
    }

    /**
     * Parses the uploaded file based on its extension.
     *
     * @param file the uploaded file
     * @param fileId the ID of the file
     * @return true if the file was successfully parsed, false otherwise
     * @throws IllegalStateException if an error occurs during parsing
     * @throws IOException if an error occurs during file reading
     */
    private boolean parseFile(MultipartFile file, Long fileId) throws IllegalStateException, IOException {
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        switch (extension) {
            case ("csv"):
                readCSV(file, fileId);
                return true;
            default:
                return false;
        }
    }

    /**
     * Reads and processes the content of a CSV file.
     *
     * @param file the CSV file
     * @param fileId the ID of the file
     * @throws IllegalStateException if an error occurs during reading
     * @throws IOException if an error occurs during file reading
     */
    private void readCSV(MultipartFile file, Long fileId) throws IllegalStateException, IOException {
        List<DataEntry> reader = new CsvToBeanBuilder<DataEntry>(new InputStreamReader(file.getInputStream()))
                .withType(DataEntry.class).build().parse();

        reader.forEach(entry -> {
            Data data = entry.toData(fileId);
            studyService.createStudy(data.getStudyId());
            data = dataService.saveData(data);
            categoriseData(entry.getDvdecod(), data.getId());
            siteService.addDefaultMapping(entry.getSiteId());
        });
    }

    /**
     * Categorises the data based on the provided DVDECODs.
     *
     * @param dvdecodsString the string containing DVDECODs
     * @param dataId the ID of the data
     */
    private void categoriseData(String dvdecodsString, Long dataId) {
        List<String> dvdecods = new ArrayList<>(List.of(dvdecodsString.split(";")));

        dvdecods.forEach(dvdecod -> {
            dvdecod = dvdecod.trim().toUpperCase();
            dvdecodRepository.findByDescription(dvdecod).ifPresentOrElse(
                    category -> saveCategory(category, dataId),
                    () -> {});
        });
    }

    /**
     * Saves a data category.
     *
     * @param dvdecod the DVDECOD entity
     * @param dataId the ID of the data
     * @return the saved data category
     */
    private DataCategory saveCategory(Dvdecod dvdecod, Long dataId) {
        DataCategory dataCategory = DataCategory.builder()
                .dataId(dataId)
                .dvdecodId(dvdecod.getId())
                .build();
        return dataCategoryRepository.save(dataCategory);
    }
}
