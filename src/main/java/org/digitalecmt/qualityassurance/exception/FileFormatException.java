package org.digitalecmt.qualityassurance.exception;

import com.opencsv.exceptions.CsvException;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class FileFormatException extends RuntimeException {
    
    private Long index;
    private String entry[];
    private String message;

    public FileFormatException(CsvException exception) {
        index = exception.getLineNumber();
        entry = exception.getLine();
        message = exception.getMessage();
    }
}
