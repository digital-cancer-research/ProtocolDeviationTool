package org.digitalecmt.qualityassurance.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AiModelException extends FileFormatException {

    public AiModelException() {
        super("An error occurred while interacting with the AI model. Please try again later.");
    }
}
