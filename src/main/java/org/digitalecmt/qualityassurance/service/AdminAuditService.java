package org.digitalecmt.qualityassurance.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.repository.AdminAuditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminAuditService {

    @Autowired 
    private AdminAuditRepository adminAuditRepository;

    public AdminAudit auditCreateUser(User user, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
        .userId(adminId)
        .action("Created a new user")
        .originalValue("N/A")
        .newValue(user.toString())
        .date(LocalDateTime.now())
        .build();
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditUpdateUser(User user, String oldUserDetails, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
        .userId(adminId)
        .action("Updated a user")
        .originalValue(oldUserDetails)
        .newValue(user.toString())
        .date(LocalDateTime.now())
        .build();
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditDeleteUser(User user, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
        .userId(adminId)
        .action("Deleted a user")
        .originalValue(user.toString())
        .newValue("N/A")
        .date(LocalDateTime.now())
        .build();
        return adminAuditRepository.save(audit);
    }

    public AdminAudit auditAddUserToTeam(User user, Team team, Long adminId) {
        AdminAudit audit = AdminAudit.builder()
        .userId(adminId)
        .action("Added a user to a team")
        .originalValue("N/A")
        .newValue("User: " + user.getUsername() + "\nTeam: " + team.getName())
        .date(LocalDateTime.now())
        .build();
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

    public AdminAudit auditSetUserTeamAccess(User user, List<Team> newTeams, List<Team> oldTeams, Long adminId) {

        String originalValue = oldTeams.stream()
        .map(team -> team.getName())
        .collect(Collectors.joining("\n"));
        
        String newValue = newTeams.stream()
        .map(team -> team.getName())
        .collect(Collectors.joining("\n"));

        AdminAudit audit = AdminAudit.builder()
        .userId(adminId)
        .action("Granted team access to " + user.getUsername())
        .originalValue(originalValue)
        .newValue(newValue)
        .date(LocalDateTime.now())
        .build();
        return adminAuditRepository.save(audit);
    }
}
