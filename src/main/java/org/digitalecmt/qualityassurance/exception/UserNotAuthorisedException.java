package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Exception thrown when a user does not have admin rights.
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserNotAuthorisedException extends RuntimeException {

    /**
     * The ID of the user who is not authorized.
     */
    private Long id;

    /**
     * Constructs a new exception with the default message.
     */
    public UserNotAuthorisedException() {
        super("UserNotAuthorisedException: User does not have admin rights.");
    }

    /**
     * Constructs a new exception with the default message and the specified user ID.
     *
     * @param id the ID of the user who is not authorized
     */
    public UserNotAuthorisedException(Long id) {
        this();
        this.id = id;
    }

    /**
     * Constructs a new exception with the specified message.
     *
     * @param message the detail message
     */
    public UserNotAuthorisedException(String message) {
        super(message);
    }

    /**
     * Constructs a new exception with the specified message and user ID.
     *
     * @param id the ID of the user who is not authorized
     * @param message the detail message
     */
    public UserNotAuthorisedException(Long id, String message) {
        super(message);
        this.id = id;
    }
}
