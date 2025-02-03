package org.digitalecmt.qualityassurance.models.dto.File;

import org.digitalecmt.qualityassurance.models.entities.File;
import org.digitalecmt.qualityassurance.models.pojo.AiCategorisationConfig;
import org.springframework.web.multipart.MultipartFile;

import com.nimbusds.jose.shaded.gson.Gson;

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

    AiCategorisationConfig aiConfig;

    public FileUploadDto(SerializedFileUploadDto serializedFileUploadDto) {
        this.file = serializedFileUploadDto.getFile();
        this.userId = serializedFileUploadDto.getUserId();
        Gson gson = new Gson();
        this.aiConfig = gson.fromJson(serializedFileUploadDto.getAiConfig(), AiCategorisationConfig.class);
    }

    /**
     * Converts this DTO to a File entity.
     * 
     * @return a File entity with the same properties as this DTO.
     */
    public File toFile() {
        return File.builder()
                .fileName(file.getOriginalFilename())
                .uploadedBy(userId)
                .build();
    }
}
