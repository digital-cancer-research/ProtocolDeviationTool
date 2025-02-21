package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.AdminAuditDto;
import org.digitalecmt.qualityassurance.service.AdminAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    
    @Autowired
    AdminAuditService adminAuditService;

    @GetMapping("/admin")
    public ResponseEntity<List<AdminAuditDto>> getAdminAudit() {
        List<AdminAuditDto> audits = adminAuditService.findAllAudits();
        return ResponseEntity.ok(audits);
    }
}
