package org.digitalecmt.qualityassurance.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException ex, WebRequest webRequest) {
        ApiError ApiError = new ApiError(HttpStatus.NOT_FOUND, "User not found with id: " + ex.getId(), ex);
        return new ResponseEntity<>(ApiError, HttpStatus.NOT_FOUND);
    }
}
