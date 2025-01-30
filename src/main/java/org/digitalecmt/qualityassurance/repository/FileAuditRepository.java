package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.FileAudit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileAuditRepository extends JpaRepository<FileAudit, Long> {
    
}
