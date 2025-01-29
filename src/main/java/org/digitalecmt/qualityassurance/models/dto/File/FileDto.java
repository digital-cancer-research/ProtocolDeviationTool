package org.digitalecmt.qualityassurance.models.dto.File;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.entities.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) for file information.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileDto {
    /** The ID of the file. */
    Long id;

    /** The name of the file. */
    String fileName;

    /** The user who uploaded the file. */
    String uploadedBy;

    /** The date and time when the file was uploaded. */
    LocalDateTime dateUploaded;

    /**
     * Constructs a FileDto from a File entity.
     * Does not initalise 'uploadedBy' as this is a string - the username of the
     * user, rather than the id.
     *
     * @param file the File entity
     */
    public FileDto(File file) {
        this.id = file.getId();
        this.fileName = file.getFileName();
        this.dateUploaded = file.getDateUploaded();
    }
}
