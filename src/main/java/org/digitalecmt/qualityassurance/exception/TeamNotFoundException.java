package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TeamNotFoundException extends RuntimeException {

    private Long id;

    public TeamNotFoundException() {
        super("TeamNotFoundException: Team not found.");
    }

    public TeamNotFoundException(Long id) {
        this();
        this.id = id;
    }

    public TeamNotFoundException(String message) {
        super(message);
    }

    public TeamNotFoundException(Long id, String message) {
        super(message);
        this.id = id;
    }
}
