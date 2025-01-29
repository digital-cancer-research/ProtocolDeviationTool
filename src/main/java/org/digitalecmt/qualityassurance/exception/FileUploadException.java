package org.digitalecmt.qualityassurance.exception;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class FileUploadException extends RuntimeException {
    
    private MultipartFile file;

    private List<FileFormatException> fileErrors;
    
    public FileUploadException(MultipartFile file) {
        super("Failed to upload file: " + file.getOriginalFilename()
                + "\n Please try again later. If issue persists then contact support.");
        this.file = file;
    }

    public FileUploadException(String message, MultipartFile file) {
        super(message);
        this.file = file;
    }

    public FileUploadException(String message, MultipartFile file, List<FileFormatException> exceptions) {
        this(message, file);
        this.fileErrors = exceptions;
    }

    public FileUploadException(MultipartFile file, List<FileFormatException> exceptions) {
        this(file);
        this.fileErrors = exceptions;
    }

    public FileUploadException(List<FileFormatException> exceptions) {
        this.fileErrors = exceptions;
    }
}
