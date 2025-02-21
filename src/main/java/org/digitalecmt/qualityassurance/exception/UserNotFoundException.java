package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Exception thrown when a user is not found.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserNotFoundException extends RuntimeException {

    /**
     * The ID of the user that was not found.
     */
    private Long id;

    /**
     * Constructs a new exception with the default message.
     */
    public UserNotFoundException() {
        super("UserNotFoundException: User not found.");
    }

    /**
     * Constructs a new exception with the default message and the specified user ID.
     *
     * @param id the ID of the user that was not found
     */
    public UserNotFoundException(Long id) {
        this();
        this.id = id;
    }

    /**
     * Constructs a new exception with the specified message.
     *
     * @param message the detail message
     */
    public UserNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new exception with the specified message and user ID.
     *
     * @param id the ID of the user that was not found
     * @param message the detail message
     */
    public UserNotFoundException(Long id, String message) {
        super(message);
        this.id = id;
    }
}