package org.digitalecmt.qualityassurance.models.dto.File;

import java.util.List;

import org.digitalecmt.qualityassurance.exception.FileFormatException;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class FileWithUploadWarningsDto extends FileDto {
    private List<FileFormatException> warnings;

    public FileWithUploadWarningsDto(FileDto fileDto) {
        this.id = fileDto.getId();
        this.fileName = fileDto.getFileName();
        this.uploadedBy = fileDto.getUploadedBy();
        this.dateUploaded = fileDto.getDateUploaded();
        this.warnings = List.of();
    }
}
