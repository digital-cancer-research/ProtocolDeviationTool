/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package org.digitalecmt.qualityassurance.controller.entity;

import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.dto.FileDTO;
import org.digitalecmt.qualityassurance.model.persistence.FileData;
import org.digitalecmt.qualityassurance.model.persistence.Files;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.FileDataRepository;
import org.digitalecmt.qualityassurance.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FilesRepository filesRepository;
    
    @Autowired
    private FileDataRepository fileDataRepository;
    
    @Autowired
    private DataEntryRepository dataEntryRepository;

    @GetMapping("/list")
    public ResponseEntity<List<FileDTO>> getUploadedFiles() {
        // Retrieve the list of uploaded files from the repository
        List<Files> uploadedFiles = filesRepository.findAll();

        // Map the retrieved files to DTOs
        List<FileDTO> fileDTOs = uploadedFiles.stream()
            .map(file -> new FileDTO(file.getFileId(), file.getFileName(), file.getUsername(), file.getDateTimeUploaded()))
            .collect(Collectors.toList());

        return new ResponseEntity<>(fileDTOs, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<String> deleteFile(@PathVariable int fileId) {
    	
        // Check if the file exists
        if (!filesRepository.existsById(fileId)) {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }

        // Retrieve all associated data entries with the given fileId
        List<FileData> fileDataEntries = fileDataRepository.findAllByFileId(fileId);

        // Iterate through the list of file data entries and delete associated data entries
        for (FileData fileData : fileDataEntries) {
            dataEntryRepository.deleteById(fileData.getEntryId());
        }

        // Delete the file and its associated data
        filesRepository.deleteById(fileId);

        return new ResponseEntity<>("File and associated data deleted successfully", HttpStatus.OK);
    }


}
