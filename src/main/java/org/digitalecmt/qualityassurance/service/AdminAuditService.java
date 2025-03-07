package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.AdminAuditDto;
import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.digitalecmt.qualityassurance.models.entities.Study;
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
        AdminAudit audit = AdminAuditMapper.INSTANCE.teamToCreateTeamAdminAudit(team, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditUpdateTeam(Team team, Team oldTeam, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.teamToUpdateTeamAdminAudit(team, oldTeam, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditDeleteTeam(Team team, Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.teamToDeleteTeamAdminAudit(team, adminId);
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditGrantTeamStudyAccess(Team team, List<Study> oldStudies, List<Study> newStudies,
            Long adminId) {
        AdminAudit audit = AdminAuditMapper.INSTANCE.teamToGrantTeamStudyAccessAudit(team, oldStudies, newStudies,
                adminId);
        return adminAuditRepository.save(audit);
    }
}
