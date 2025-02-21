package org.digitalecmt.qualityassurance.exception;

import com.opencsv.exceptions.CsvException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Exception thrown when there is a format issue with a file.
 */
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
public class FileFormatException extends RuntimeException {

    private Long index;
    private String entry[];
    private String message;

    /**
     * Constructs a new FileFormatException with the specified message.
     *
     * @param message the detail message
     */
    public FileFormatException(String message) {
        super(message);
    }

    /**
     * Constructs a new FileFormatException from a CsvException.
     *
     * @param exception the CsvException
     */
    public FileFormatException(CsvException exception) {
        index = exception.getLineNumber();
        entry = exception.getLine();
        message = exception.getMessage();
    }
}
