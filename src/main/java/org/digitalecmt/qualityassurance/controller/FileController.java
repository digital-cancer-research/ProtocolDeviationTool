package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.File.FileDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileUploadDto;
import org.digitalecmt.qualityassurance.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller class for managing file-related operations.
 */
@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    /**
     * Retrieves all uploaded files.
     *
     * @return a ResponseEntity containing the list of all files and HTTP status OK
     */
    @GetMapping
    public ResponseEntity<List<FileDto>> getUploadedFiles() {
        List<FileDto> files = fileService.findAllFiles();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }

    /**
     * Uploads a new file.
     *
     * @param fileDto the data transfer object containing the file details
     * @return a ResponseEntity containing the uploaded file and HTTP status OK
     */
    @PostMapping
    public ResponseEntity<FileDto> uploadFile(@ModelAttribute FileUploadDto fileDto) {
        FileDto file = fileService.uploadFile(fileDto);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }

    /**
     * Deletes a file by its ID.
     *
     * @param id the ID of the file to delete
     * @param adminId the ID of the admin performing the deletion
     * @return a ResponseEntity with HTTP status NO_CONTENT
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id, @RequestParam Long adminId) {
        fileService.deleteFile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
