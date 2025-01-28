package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.models.dto.User.UserCreateWithTeamsDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateWithTeamsDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserWithTeamsDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.entities.UserTeam;
import org.digitalecmt.qualityassurance.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
public class UserTeamService {

    @Autowired
    private AdminAuditService adminAuditService;

    @Autowired
    private UserTeamRepository userTeamRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private TeamService teamService;

    @Transactional
    public UserWithTeamsDto createUserWithTeamAccess(UserCreateWithTeamsDto userDto) {
        User user = userService.createUser(userDto);
        List<Team> teams = setUserTeamAccess(user.getId(), userDto.getTeamIds(), userDto.getAdminId());
        return new UserWithTeamsDto(user, teams);
    }

    /**
     * Updates a user's team access and returns the updated user with their teams.
     * 
     * @param userDto the data transfer object containing the updated user details
     *                and team IDs
     * @return a UserWithTeamsDto containing the updated user and their teams
     */
    @Transactional
    public UserWithTeamsDto updateUserWithTeamAccess(UserUpdateWithTeamsDto userDto) {
        Long userId = userDto.getId();

        User user = userService.updateUser(userDto);
        List<Team> teams = setUserTeamAccess(userId, userDto.getTeamIds(), userDto.getAdminId());

        return new UserWithTeamsDto(user, teams);
    }

    /**
     * Sets the team access for a user.
     * 
     * @param userId  the ID of the user
     * @param teamIds the list of team IDs to grant access to
     * @param adminId the ID of the admin performing the operation
     * @return a list of teams the user has access to
     */
    @Transactional
    public List<Team> setUserTeamAccess(Long userId, List<Long> teamIds, Long adminId) {
        User user = userService.findUserById(userId);
        List<Team> oldTeams = userTeamRepository.findTeamsByUserId(userId);

        List<Long> oldTeamIds = oldTeams.stream().map(team -> team.getId()).collect(Collectors.toList());
        if (oldTeamIds.equals(teamIds)) {
            return oldTeams;
        }

        resetUserTeamAccess(userId);

        List<Team> teams = new ArrayList<>();

        for (Long teamId : teamIds) {

            Team team = teamService.findTeamById(teamId);
            teams.add(team);

            UserTeam userTeam = UserTeam.builder()
                    .userId(userId)
                    .teamId(teamId)
                    .build();

            userTeamRepository.save(userTeam);
        }

        adminAuditService.auditSetUserTeamAccess(user, teams, oldTeams, adminId);

        return teams;
    }

    /**
     * Resets the team access for a user by deleting all their team associations.
     * 
     * @param userId the ID of the user
     */
    private void resetUserTeamAccess(Long userId) {
        userTeamRepository.deleteByUserId(userId);
    }
}
