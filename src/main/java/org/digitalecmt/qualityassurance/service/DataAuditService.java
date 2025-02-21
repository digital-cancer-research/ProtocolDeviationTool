package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.DataAuditDto;
import org.digitalecmt.qualityassurance.models.entities.DataAudit;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.AiResponse;
import org.digitalecmt.qualityassurance.repository.DataAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataAuditService {

    @Autowired
    private DataAuditRepository dataAuditRepository;

    @Autowired
    private UserService userService;

    public void saveAudit(DataAudit dataAudit) {
        dataAuditRepository.save(dataAudit);
    }

    public void auditAiResponse(AiResponse response, long dataId) {
        User ai = userService.getAiUser();
        DataAudit audit = DataAudit.builder()
                .dataId(dataId)
                .userId(ai.getId())
                .originalValue("N/A")
                .newValue(response.toString())
                .build();
        saveAudit(audit);
    }

    public List<DataAuditDto> getAudits() {
        return dataAuditRepository.findAllAudits();
    }
}
