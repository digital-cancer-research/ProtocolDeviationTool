package org.digitalecmt.qualityassurance.models.dto.File;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SerializedFileUploadDto {
        /**
     * The native file object.
     */
    MultipartFile file;

    /**
     * The ID of the user who uploaded the file.
     */
    Long userId;

    String aiConfig;
}
