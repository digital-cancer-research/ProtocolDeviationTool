package org.digitalecmt.qualityassurance.models.mapper;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AdminAuditMapper {
    AdminAuditMapper INSTANCE = Mappers.getMapper(AdminAuditMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "user.username")
    @Mapping(target = "action", constant = "Created a new user")
    @Mapping(target = "originalValue", constant = "N/A")
    @Mapping(target = "newValue", expression = "java(user.getAuditDetails())")
    @Mapping(target = "date", ignore = true)
    AdminAudit userToCreateUserAdminAudit(User user, long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "oldUser.username")
    @Mapping(target = "action", constant = "Updated a user")
    @Mapping(target = "originalValue", expression = "java(oldUser.getAuditDetails())")
    @Mapping(target = "newValue", expression = "java(user.getAuditDetails())")
    @Mapping(target = "date", ignore = true)
    AdminAudit userToUpdateUserAdminAudit(User user, User oldUser, long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "user.username")
    @Mapping(target = "action", constant = "Deleted a user")
    @Mapping(target = "originalValue", expression = "java(user.getAuditDetails())")
    @Mapping(target = "newValue", constant = "N/A")
    @Mapping(target = "date", ignore = true)
    AdminAudit userToDeleteUserAdminAudit(User user, long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "user.username")
    @Mapping(target = "action", constant = "Added a user to a team")
    @Mapping(target = "originalValue", constant = "N/A")
    @Mapping(target = "newValue", expression = "java(team.getAuditDetails())")
    @Mapping(target = "date", ignore = true)
    AdminAudit userToAddUserToTeamAdminAudit(User user, Team team, Long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "user.username")
    @Mapping(target = "action", constant = "Granted team access to user")
    @Mapping(target = "originalValue", expression = "java(Team.getTeamnamesAsJson(oldTeams))")
    @Mapping(target = "newValue", expression = "java(Team.getTeamnamesAsJson(newTeams))")
    @Mapping(target = "date", ignore = true)
    AdminAudit userToSetUserTeamAccessAudit(User user, List<Team> newTeams, List<Team> oldTeams, Long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "team.name")
    @Mapping(target = "action", constant = "Created a team")
    @Mapping(target = "originalValue", constant = "N/A")
    @Mapping(target = "newValue", expression = "java(team.getAuditDetails())")
    @Mapping(target = "date", ignore = true)
    AdminAudit teamToCreateTeamAdminAudit(Team team, Long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "oldTeam.name")
    @Mapping(target = "action", constant = "Updated a team")
    @Mapping(target = "originalValue", expression = "java(oldTeam.getAuditDetails())")
    @Mapping(target = "newValue", expression = "java(team.getAuditDetails())")
    @Mapping(target = "date", ignore = true)
    AdminAudit teamToUpdateTeamAdminAudit(Team team, Team oldTeam, Long adminId);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "userId", source = "adminId")
    @Mapping(target = "entity", source = "team.name")
    @Mapping(target = "action", constant = "Deleted a team")
    @Mapping(target = "originalValue", expression = "java(team.getAuditDetails())")
    @Mapping(target = "newValue", constant = "N/A")
    @Mapping(target = "date", ignore = true)
    AdminAudit teamToDeleteTeamAdminAudit(Team team, Long adminId);
}
