package org.digitalecmt.qualityassurance.exception;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private Integer statusCode;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-mm-yyyy HH:mm:ss")
    private LocalDateTime timestamp;
    private String message;
    private String error;
    private List<RuntimeException> subErrors;

    ApiError() {
        timestamp = LocalDateTime.now();
        message = "Unexpected error. Please try again later or contact adminstrator if issue persists.";
        this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
    }

    ApiError(HttpStatus status) {
        this();
        this.statusCode = status.value();
    }
 
    ApiError(HttpStatus status, Throwable ex) {
        this();
        this.statusCode = status.value();
        this.message = "Unexpected error";
        this.error = ex.getLocalizedMessage();
    }
 
    ApiError(HttpStatus status, String message, Throwable ex) {
        this();
        this.statusCode = status.value();
        this.message = message;
        this.error = ex.getLocalizedMessage();
    }
}