package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.FileAuditDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileUploadDto;
import org.digitalecmt.qualityassurance.models.dto.File.FileWithUploadWarningsDto;
import org.digitalecmt.qualityassurance.models.dto.File.SerializedFileUploadDto;
import org.digitalecmt.qualityassurance.service.FileAuditService;
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

    @Autowired
    private FileAuditService fileAuditService;

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
     * @param serializedFileDto the data transfer object containing the serialized file details
     * @return a ResponseEntity containing the uploaded file and HTTP status OK
     */
    @PostMapping
    public ResponseEntity<FileWithUploadWarningsDto> uploadFile(@ModelAttribute SerializedFileUploadDto serializedFileDto) {
        FileUploadDto fileDto = new FileUploadDto(serializedFileDto);
        FileWithUploadWarningsDto file = fileService.uploadFile(fileDto);
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
        fileService.deleteFile(id, adminId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Retrieves the file audit logs.
     *
     * @return a ResponseEntity containing the list of file audit logs and HTTP status OK
     */
    @GetMapping("/audit")
    public ResponseEntity<List<FileAuditDto>> getFileAudit() {
        List<FileAuditDto> audits = fileAuditService.getFileAudits();
        return new ResponseEntity<>(audits, HttpStatus.OK);
    }
}
