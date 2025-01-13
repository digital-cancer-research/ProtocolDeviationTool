package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserNotFoundException extends RuntimeException {

    private Integer id;

    public UserNotFoundException() {
        super("UserNotFoundException: User not found.");
    }

    public UserNotFoundException(Integer id) {
        this();
        this.id = id;
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(Integer id, String message) {
        super(message);
        this.id = id;
    }
}