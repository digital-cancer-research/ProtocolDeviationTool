package org.digitalecmt.qualityassurance.exception;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Exception thrown when a file upload fails.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class FileUploadException extends RuntimeException {
    
    private MultipartFile file;

    private List<FileFormatException> fileErrors;

    /**
     * Constructs a new FileUploadException with a default message.
     */
    public FileUploadException() {
        super("Failed to upload file.");
    }

    /**
     * Constructs a new FileUploadException with the specified message.
     *
     * @param message the detail message
     */
    public FileUploadException(String message) {
        super(message);
    }
    
    /**
     * Constructs a new FileUploadException with the specified file.
     *
     * @param file the file that failed to upload
     */
    public FileUploadException(MultipartFile file) {
        super("Failed to upload file: " + file.getOriginalFilename()
                + "\n Please try again later. If issue persists then contact support.");
        this.file = file;
    }

    /**
     * Constructs a new FileUploadException with the specified message and file.
     *
     * @param message the detail message
     * @param file the file that failed to upload
     */
    public FileUploadException(String message, MultipartFile file) {
        super(message);
        this.file = file;
    }

    /**
     * Constructs a new FileUploadException with the specified message, file, and list of exceptions.
     *
     * @param message the detail message
     * @param file the file that failed to upload
     * @param exceptions the list of file format exceptions
     */
    public FileUploadException(String message, MultipartFile file, List<FileFormatException> exceptions) {
        this(message, file);
        this.fileErrors = exceptions;
    }

    /**
     * Constructs a new FileUploadException with the specified file and list of exceptions.
     *
     * @param file the file that failed to upload
     * @param exceptions the list of file format exceptions
     */
    public FileUploadException(MultipartFile file, List<FileFormatException> exceptions) {
        this(file);
        this.fileErrors = exceptions;
    }

    /**
     * Constructs a new FileUploadException with the specified list of exceptions.
     *
     * @param exceptions the list of file format exceptions
     */
    public FileUploadException(List<FileFormatException> exceptions) {
        this.fileErrors = exceptions;
    }
}
