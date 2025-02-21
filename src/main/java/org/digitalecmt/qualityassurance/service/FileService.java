package org.digitalecmt.qualityassurance.service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.exception.FileFormatException;
import org.digitalecmt.qualityassurance.exception.FileUploadException;
import org.digitalecmt.qualityassurance.models.dto.File.FileDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileUploadDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileWithUploadWarningsDto;
import org.apache.commons.io.FilenameUtils;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.models.entities.ExternalSiteMapping;
import org.digitalecmt.qualityassurance.models.entities.File;
import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.models.pojo.AiCategorisationConfig;
import org.digitalecmt.qualityassurance.models.pojo.AiResponse;
import org.digitalecmt.qualityassurance.models.pojo.DataEntry;
import org.digitalecmt.qualityassurance.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

/**
 * Service class for managing files.
 */
@Service
public class FileService {

    @Autowired
    private AiService aiService;

    @Autowired
    private FileAuditService fileAuditService;

    @Autowired
    private DataAuditService dataAuditService;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private DataService dataService;

    @Autowired
    private DeviationService deviationService;

    @Autowired
    private SiteService siteService;

    @Autowired
    private UserService userService;

    @Autowired
    private StudyService studyService;

    /**
     * Retrieves all files.
     *
     * @return a list of all files
     */
    public List<FileDto> findAllFiles() {
        List<FileDto> files = new ArrayList<>();
        fileRepository.findAll().forEach(file -> {
            FileDto fileDto = fileToFileDto(file);
            files.add(fileDto);
        });
        return files;
    }

    /**
     * Converts a File entity to a FileDto.
     *
     * @param file the File entity
     * @return the FileDto
     */
    public FileDto fileToFileDto(File file) {
        FileDto fileDto = new FileDto(file);
        fileDto.setUploadedBy(userService.findUserById(file.getUploadedBy()).getUsername());
        return fileDto;
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
     * @param id     the ID of the file to delete
     * @param userId the ID of the user performing the deletion
     */
    @Transactional
    public void deleteFile(Long id, Long userId) {
        File file = findById(id);
        fileAuditService.auditDeleteFile(file, userId);
        fileRepository.delete(file);
    }

    /**
     * Uploads a file and processes its content.
     *
     * @param fileDto the data transfer object containing the file details
     * @return the uploaded file with upload warnings
     */
    @Transactional
    public FileWithUploadWarningsDto uploadFile(FileUploadDto fileDto) {
        File file = saveFile(fileDto);
        List<FileFormatException> warnings = parseFile(fileDto, file.getId());
        fileAuditService.auditFileUpload(file, fileDto.getUserId());
        FileWithUploadWarningsDto fileWithWarnings = new FileWithUploadWarningsDto(fileToFileDto(file));
        fileWithWarnings.setWarnings(warnings);
        return fileWithWarnings;
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
     * @param fileDto the data transfer object containing the file details
     * @param fileId  the ID of the file
     * @return a list of file format exceptions
     */
    private List<FileFormatException> parseFile(FileUploadDto fileDto, Long fileId) {
        MultipartFile file = fileDto.getFile();
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        switch (extension) {
            case ("csv"):
                return readCSV(fileDto, fileId);
            default:
                return null;
        }
    }

    /**
     * Reads and processes the content of a CSV file.
     *
     * @param fileDto the data transfer object containing the file details
     * @param fileId  the ID of the file
     * @return a list of file format exceptions
     * @throws FileFormatException if there are errors within the file
     */
    private List<FileFormatException> readCSV(FileUploadDto fileDto, Long fileId) {

        MultipartFile file = fileDto.getFile();
        Long userId = fileDto.getUserId();

        try (InputStreamReader reader = new InputStreamReader(file.getInputStream())) {
            CsvToBean<DataEntry> csvToBean = new CsvToBeanBuilder<DataEntry>(reader)
                    .withType(DataEntry.class)
                    .withThrowExceptions(false)
                    .build();

            List<DataEntry> entries = csvToBean.parse();
            List<FileFormatException> warnings = processEntries(entries, fileId, fileDto.getAiConfig());

            List<FileFormatException> errors = csvToBean.getCapturedExceptions().stream()
                    .map(FileFormatException::new)
                    .collect(Collectors.toList());

            if (!errors.isEmpty()) {
                fileAuditService.auditUploadFailed(file.getOriginalFilename(), userId);
                throw new FileUploadException(
                        "There seems to be a problem with the template of the file. Please fix it and try again.",
                        file,
                        errors);
            }
            return warnings;
        } catch (IOException e) {
            fileAuditService.auditUploadFailed(file.getOriginalFilename(), userId);
            throw new FileUploadException(file);
        }
    }

    /**
     * Processes the entries from the CSV file.
     *
     * @param entries the list of data entries
     * @param fileId  the ID of the file
     * @param config  the AI categorisation configuration
     * @return a list of file format exceptions
     */
    private List<FileFormatException> processEntries(List<DataEntry> entries, Long fileId,
            AiCategorisationConfig config) {
        Boolean useAi = config.isUseAi();
        List<FileFormatException> errors = new ArrayList<FileFormatException>();

        for (int index = 0; index < entries.size(); index++) {
            DataEntry entry = entries.get(index);
            ExternalSiteMapping mapping = siteService.addDefaultMapping(entry.getStudyId());
            Study study = studyService.createStudy(entry.getSiteId());

            Data data = dataService.toData(entry, fileId, mapping.getId(), study.getId());
            data = dataService.saveData(data);

            List<String> dvcats = parseCategories(entry.getDvcat());
            List<String> dvdecods = parseCategories(entry.getDvdecod());

            if (useAi && dvcats.isEmpty() && dvdecods.isEmpty()) {
                if (!handleAiCategorisation(data, config)) {
                    errors.add(new FileFormatException(Long.valueOf(entries.indexOf(entry)), entry.toArray(),
                            "The AI model could not categorise this entry."));
                }
            } else {
                if (!deviationService.categoriseData(dvcats, dvdecods, data.getId())) {
                    errors.add(new FileFormatException(Long.valueOf(entries.indexOf(entry)), entry.toArray(),
                            "One or more of the dvcat/dvdecods were not valid."));
                }
            }

        }
        return errors;
    }

    /**
     * Categorises data using AI.
     *
     * @param data   the data to categorise
     * @param config the AI categorisation configuration
     * @return true if categorisation was successful, false otherwise
     */
    private boolean handleAiCategorisation(Data data, AiCategorisationConfig config) {
        AiResponse[] predictions = aiService.predict(data.getDvspondes(),
                config.getUncategorisedHandling().getNumberOfPredictions());
        if (predictions != null) {
            for (AiResponse prediction : predictions) {
                dataAuditService.auditAiResponse(prediction, data.getId());
            }

            List<String> predictedDvcats = predictions[0]
                    .getCategories()
                    .stream()
                    .map(p -> p.getDvcat())
                    .toList();

            List<String> predictedDvdecods = predictions[0]
                    .getCategories()
                    .stream()
                    .map(p -> p.getDvdecod())
                    .toList();

            deviationService.categoriseData(predictedDvcats, predictedDvdecods, data.getId());
            return true;
        } else {
            return false;
        }
    }

    /**
     * Parses categories from a semicolon-separated string.
     *
     * @param categories the semicolon-separated string of categories
     * @return a list of parsed categories
     */
    private List<String> parseCategories(String categories) {
        return Arrays.asList(categories.split(";"))
                .stream()
                .filter(category -> !category.isBlank())
                .toList();
    }
}
