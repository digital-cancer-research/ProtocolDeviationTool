package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.exception.TeamNotFoundException;
import org.digitalecmt.qualityassurance.exception.UserNotAuthorisedException;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamCreateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service class for managing teams.
 */
@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private AuthorisationService authService;

    @Autowired
    private AdminAuditService adminAuditService;

    /**
     * Retrieves all teams.
     *
     * @return a list of all teams
     */
    public List<Team> findTeams() {
        return teamRepository.findAll();
    }

    /**
     * Retrieves all teams with their admin usernames.
     *
     * @return a list of teams with admin usernames
     * @note The admin is the user who created the team.
     */
    public List<TeamWithAdminUsernameDto> findTeamsWithAdminUsername() {
        return teamRepository.findTeamsWithAdminUsername();
    }

    public void verifyTeamId(Long teamId) {
        findTeamById(teamId);
    }

    /**
     * Finds a team by its ID.
     *
     * @param teamId the ID of the team to find
     * @return the found team
     * @throws TeamNotFoundException if the team is not found
     */
    public Team findTeamById(Long teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
    }

    /**
     * Finds a team with admin username by its ID.
     *
     * @param teamId the ID of the team to find
     * @return the found team with admin username
     * @throws TeamNotFoundException if the team is not found
     * @note The admin is the user who created the team.
     */
    public TeamWithAdminUsernameDto findTeamWithAdminNameById(Long teamId) {
        return teamRepository.findTeamWithAdminUsername(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
    }

    /**
     * Creates a new team.
     *
     * @param teamDto the data transfer object containing the team details
     * @return the created team
     * @throws UserNotAuthorisedException if the admin is not authorised
     * @note The admin is the user who created the team.
     */
    @Transactional
    public Team createTeam(TeamCreateDto teamDto) {
        Long adminId = teamDto.getAdminId();

        authService.checkIfUserIsAdmin(adminId);

        Team team = teamDto.toTeam();
        adminAuditService.auditCreateTeam(team, adminId);

        return team;
    }

    /**
     * Updates an existing team.
     *
     * @param teamDto the data transfer object containing the updated team details
     * @return the updated team
     * @throws TeamNotFoundException      if the team is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    @Transactional
    public Team updateTeam(TeamUpdateDto teamDto) {
        Long adminId = teamDto.getAdminId();
        Long teamId = teamDto.getTeamId();

        authService.checkIfUserIsAdmin(adminId);
        Team oldTeam = findTeamById(teamId);
        String oldTeamDetails = oldTeam.toString();

        Team team = teamDto.toTeam();
        team.setDateCreated(oldTeam.getDateCreated());

        if (team.toString().equals(oldTeamDetails)) {
            return team;
        }

        teamRepository.save(team);
        adminAuditService.auditUpdateTeam(team, oldTeamDetails, adminId);

        return team;
    }

    /**
     * Deletes a team by its ID.
     *
     * @param teamDto the data transfer object containing the team ID and admin ID
     * @throws TeamNotFoundException      if the team is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    @Transactional
    public void deleteTeam(TeamDeleteDto teamDto) {
        Long adminId = teamDto.getAdminId();
        Long teamId = teamDto.getTeamId();

        authService.checkIfUserIsAdmin(adminId);
        Team team = findTeamById(teamId);

        teamRepository.deleteById(teamId);
        adminAuditService.auditDeleteTeam(team, adminId);
    }
}
