package org.digitalecmt.qualityassurance.service;

import java.io.Serializable;

public class MissingCellsException extends RuntimeException implements Serializable {
    private static final long serialVersionUID = 123456789L;

    public MissingCellsException(String message) {
        super(message);
    }
}
