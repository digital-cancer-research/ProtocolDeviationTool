package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.File.FileCreateDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileDeleteDto;
import org.digitalecmt.qualityassurance.models.entities.File;
import org.digitalecmt.qualityassurance.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing files.
 */
@Service
public class FileService {
    
    @Autowired
    private FileRepository fileRepository;
    
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
     * Saves a new file.
     *
     * @param fileDto the data transfer object containing the file details
     * @return the saved file
     */
    public File saveFile(FileCreateDto fileDto) {
        File file = fileDto.toFile();
        return fileRepository.save(file);
    }

    /**
     * Deletes a file by its ID.
     *
     * @param file the data transfer object containing the file ID
     */
    public void deleteFile(FileDeleteDto file) {
        fileRepository.deleteById(file.getFileId());
    }

}
