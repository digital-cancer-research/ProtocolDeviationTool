package org.digitalecmt.qualityassurance.exception;

import org.springframework.transaction.CannotCreateTransactionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

/**
 * Global exception handler for handling various exceptions across the application.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles {@link UserNotFoundException} and returns a 404 Not Found response.
     *
     * @param ex the exception
     * @param webRequest the web request
     * @return a ResponseEntity containing the error details
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFoundException(UserNotFoundException ex, WebRequest webRequest) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, "User not found", ex);
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles {@link UserNotAuthorisedException} and returns a 403 Forbidden response.
     *
     * @param ex the exception
     * @param webRequest the web request
     * @return a ResponseEntity containing the error details
     */
    @ExceptionHandler(UserNotAuthorisedException.class)
    public ResponseEntity<ApiError> handleUserNotAuthorisedException(UserNotAuthorisedException ex, WebRequest webRequest) {
        ApiError apiError = new ApiError(HttpStatus.FORBIDDEN, "You are not authorised to perform this action", ex);
        return new ResponseEntity<>(apiError, HttpStatus.FORBIDDEN);
    }

    /**
     * Handles {@link TeamNotFoundException} and returns a 404 Not Found response.
     *
     * @param ex the exception
     * @param webRequest the web request
     * @return a ResponseEntity containing the error details
     */
    @ExceptionHandler(TeamNotFoundException.class)
    public ResponseEntity<ApiError> handleTeamNotFoundException(TeamNotFoundException ex, WebRequest webRequest) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, "Team not found", ex);
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles {@link FileNotFoundException} and returns a 404 Not Found response.
     *
     * @param ex the exception
     * @param webRequest the web request
     * @return a ResponseEntity containing the error details
     */
    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<ApiError> handleFileNotFoundException(FileNotFoundException ex, WebRequest webRequest) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, "File not found", ex);
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles {@link CannotCreateTransactionException} and returns a 503 Service Unavailable response.
     *
     * @param ex the exception
     * @param webRequest the web request
     * @return a ResponseEntity containing the error details
     */
    @ExceptionHandler(CannotCreateTransactionException.class)
    public ResponseEntity<ApiError> handleCannotCreateTransactionException(CannotCreateTransactionException ex, WebRequest webRequest) {
        ApiError apiError = new ApiError(HttpStatus.SERVICE_UNAVAILABLE,
                "There was an issue connecting to the database. Please try again later or contact your administrator if issue persists.",
                ex);
        return new ResponseEntity<>(apiError, HttpStatus.SERVICE_UNAVAILABLE);
    }
}