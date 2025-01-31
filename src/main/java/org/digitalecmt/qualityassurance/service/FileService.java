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
import org.apache.commons.io.FilenameUtils;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.models.entities.File;
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
    private FileAuditService fileAuditService;

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
     * @param id the ID of the file to delete
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
     * @return the uploaded file
     */
    @Transactional
    public FileDto uploadFile(FileUploadDto fileDto) {
        File file = saveFile(fileDto);
        parseFile(fileDto, file.getId());
        fileAuditService.auditFileUpload(file, fileDto.getUserId());
        return fileToFileDto(file);
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
     * @param fileId the ID of the file
     * @return true if the file was successfully parsed, false otherwise
     */
    private boolean parseFile(FileUploadDto fileDto, Long fileId) {
        MultipartFile file = fileDto.getFile();
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());

        switch (extension) {
            case ("csv"):
                readCSV(fileDto, fileId);
                return true;
            default:
                return false;
        }
    }

    /**
     * Reads and processes the content of a CSV file.
     *
     * @param fileDto the data transfer object containing the file details
     * @param fileId the ID of the file
     * @throws FileFormatException if there are errors within the file
     */
    private void readCSV(FileUploadDto fileDto, Long fileId) {
        MultipartFile file = fileDto.getFile();
        Long userId = fileDto.getUserId();
        try {
            CsvToBean<DataEntry> csvToBean = new CsvToBeanBuilder<DataEntry>(
                    new InputStreamReader(file.getInputStream()))
                    .withType(DataEntry.class)
                    .withThrowExceptions(false)
                    .build();

            List<DataEntry> reader = csvToBean.parse();

            reader.forEach(entry -> {
                Data data = entry.toData(fileId);
                studyService.createStudy(data.getStudyId());
                data = dataService.saveData(data);

                List<String> dvcats = Arrays.asList(
                        entry.getDvcat().split(";"));
                List<String> dvdecods = Arrays.asList(
                        entry.getDvdecod().split(";"));

                deviationService.categoriseData(dvcats, dvdecods, data.getId());
                siteService.addDefaultMapping(entry.getSiteId());
            });

            List<FileFormatException> errors = csvToBean.getCapturedExceptions().stream()
                    .map(exception -> new FileFormatException(exception))
                    .collect(Collectors.toList());

            if (errors.size() > 0) {
                fileAuditService.auditUploadFailed(file.getOriginalFilename(), userId);
                throw new FileUploadException(
                        "There seems to be a problem with the template of the file. Please fix it and try again.",
                        file,
                        errors);
            }

        } catch (IllegalStateException e) {
        } catch (IOException e) {
            fileAuditService.auditUploadFailed(file.getOriginalFilename(), userId);
            throw new FileUploadException(file);
        }
    }
}
