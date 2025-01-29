package org.digitalecmt.qualityassurance.models.dto.File;

import org.springframework.web.multipart.MultipartFile;

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
public class FileUploadDto {
    /**
     * The native file object.
     */
    MultipartFile file;

    /**
     * The ID of the user who uploaded the file.
     */
    Long userId;

    /**
     * Converts this DTO to a File entity.
     * 
     * @return a File entity with the same properties as this DTO.
     */
    public org.digitalecmt.qualityassurance.models.entities.File toFile() {
        return org.digitalecmt.qualityassurance.models.entities.File.builder()
                .fileName(file.getOriginalFilename())
                .uploadedBy(userId)
                .build();
    }
}
