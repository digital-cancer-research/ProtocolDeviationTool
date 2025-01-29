package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Exception thrown when a file is not found.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class FileNotFoundException extends RuntimeException {

    private Long id;

    /**
     * Constructs a new FileNotFoundException with a default message.
     */
    public FileNotFoundException() {
        super("FileNotFoundException: File not found.");
    }

    /**
     * Constructs a new FileNotFoundException with the specified ID.
     *
     * @param id the ID of the file that was not found
     */
    public FileNotFoundException(Long id) {
        this();
        this.id = id;
    }

    /**
     * Constructs a new FileNotFoundException with the specified message.
     *
     * @param message the detail message
     */
    public FileNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new FileNotFoundException with the specified ID and message.
     *
     * @param id      the ID of the file that was not found
     * @param message the detail message
     */
    public FileNotFoundException(Long id, String message) {
        super(message);
        this.id = id;
    }
}
