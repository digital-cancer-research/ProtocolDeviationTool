package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.FileAuditDto;
import org.digitalecmt.qualityassurance.models.entities.File;
import org.digitalecmt.qualityassurance.models.entities.FileAudit;
import org.digitalecmt.qualityassurance.models.pojo.FileStatus;
import org.digitalecmt.qualityassurance.repository.FileAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FileAuditService {

    @Autowired
    private FileAuditRepository fileAuditRepository;

    @Autowired
    private UserService userService;

    public List<FileAuditDto> getFileAudits() {
        List<FileAudit> audits = fileAuditRepository.findAll();
        List<FileAuditDto> results = new ArrayList<FileAuditDto>();
        audits.forEach(audit -> {
            String username = userService.findUserById(audit.getUserId()).getUsername();
            FileAuditDto result = new FileAuditDto(audit);
            result.setUsername(username);
            results.add(result);
        }); 
        return results;
    }

    public FileAudit auditFileUpload(File file, Long userId) {
        FileAudit audit = FileAudit.builder()
                .fileName(file.getFileName())
                .userId(userId)
                .fileStatus(FileStatus.UPLOADED)
                .build();
        return fileAuditRepository.save(audit);
    }

    public FileAudit auditDeleteFile(File file, Long userId) {
        FileAudit audit = FileAudit.builder()
                .fileName(file.getFileName())
                .userId(userId)
                .fileStatus(FileStatus.DELETED)
                .build();
        return fileAuditRepository.save(audit);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public FileAudit auditUploadFailed(String filename, Long userId) {
        FileAudit audit = FileAudit.builder()
                .fileName(filename)
                .userId(userId)
                .fileStatus(FileStatus.UPLOAD_FAILED)
                .build();
        return fileAuditRepository.save(audit);
    }
}
