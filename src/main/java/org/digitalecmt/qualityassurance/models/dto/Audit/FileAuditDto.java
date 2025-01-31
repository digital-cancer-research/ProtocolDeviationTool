package org.digitalecmt.qualityassurance.models.dto.Audit;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.entities.FileAudit;
import org.digitalecmt.qualityassurance.models.pojo.FileStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FileAuditDto {
    Long id;
    String username;
    String fileName;
    FileStatus fileStatus;
    LocalDateTime date;

    public FileAuditDto(FileAudit audit) {
        id = audit.getId();
        fileName = audit.getFileName();
        fileStatus = audit.getFileStatus();
        date = audit.getDate();
    }
}
