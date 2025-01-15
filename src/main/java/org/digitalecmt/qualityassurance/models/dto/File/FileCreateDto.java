package org.digitalecmt.qualityassurance.models.dto.File;

import org.digitalecmt.qualityassurance.models.entities.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data transfer object for creating a file.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileCreateDto {
    /**
     * The name of the file.
     */
    String fileName;

    /**
     * The ID of the user who uploaded the file.
     */
    Long uploadedBy;

    /**
     * Converts this DTO to a File entity.
     * 
     * @return a File entity with the same properties as this DTO.
     */
    public File toFile() {
        return File.builder()
                .fileName(fileName)
                .uploadedBy(uploadedBy)
                .build();
    }
}
