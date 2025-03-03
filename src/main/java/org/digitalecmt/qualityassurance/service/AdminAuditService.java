package org.digitalecmt.qualityassurance.service;

import java.time.LocalDateTime;
import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.AdminAuditDto;
import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.mapper.AdminAuditMapper;
import org.digitalecmt.qualityassurance.repository.AdminAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminAuditService {

    @Autowired
    private AdminAuditRepository adminAuditRepository;

    public List<AdminAuditDto> findAllAudits() {
        return adminAuditRepository.findAllAudits();
    }

    public AdminAudit auditCreateUser(User user, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToCreateUserAdminAudit(user, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditUpdateUser(User user, User oldUser, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToUpdateUserAdminAudit(user, oldUser, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditDeleteUser(User user, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToDeleteUserAdminAudit(user, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditAddUserToTeam(User user, Team team, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToAddUserToTeamAdminAudit(user, team, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditSetUserTeamAccess(User user, List<Team> newTeams, List<Team> oldTeams, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToSetUserTeamAccessAudit(user, newTeams,
                oldTeams, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditCreateTeam(Team team, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
                .userId(adminId)
                .action("Created a new team")
                .originalValue("N/A")
                .newValue(team.toString())
                .date(LocalDateTime.now())
                .build();
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditUpdateTeam(Team team, String oldTeamDetails, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
                .userId(adminId)
                .action("Updated a team")
                .originalValue(oldTeamDetails)
                .newValue(team.toString())
                .date(LocalDateTime.now())
                .build();
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditDeleteTeam(Team team, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
                .userId(adminId)
                .action("Deleted a team")
                .originalValue(team.toString())
                .newValue("N/A")
                .date(LocalDateTime.now())
                .build();
        return adminAuditRepository.save(audit);
    }
}
