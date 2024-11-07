package org.digitalecmt.qualityassurance.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.CannotCreateTransactionException;
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

    @ExceptionHandler(CannotCreateTransactionException.class)
    public ResponseEntity<ApiError> handleCannotCreateTransactionException(CannotCreateTransactionException ex,
            WebRequest webRequest) {
        ApiError ApiError = new ApiError(HttpStatus.SERVICE_UNAVAILABLE,
                "There was an issue connecting to the database. Please try again later or contact your administrator if issue persists.",
                ex);
        return new ResponseEntity<>(ApiError, HttpStatus.SERVICE_UNAVAILABLE);
    }
}