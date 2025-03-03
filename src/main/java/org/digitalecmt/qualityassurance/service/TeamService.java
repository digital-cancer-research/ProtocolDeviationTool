package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;

import org.digitalecmt.qualityassurance.exception.TeamNotFoundException;
import org.digitalecmt.qualityassurance.exception.UserNotAuthorisedException;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamCreateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithStudiesDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithStudiesUpdateDto;
import org.digitalecmt.qualityassurance.models.entities.Study;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.TeamStudy;
import org.digitalecmt.qualityassurance.models.mapper.TeamMapper;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.TeamStudyRepository;
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
    private TeamStudyRepository teamStudyRepository;

    @Autowired
    private AuthorisationService authService;

    @Autowired
    private AdminAuditService adminAuditService;

    @Autowired
    private StudyService studyService;

    @Autowired
    private TeamMapper teamMapper;

    /**
     * Retrieves all teams.
     *
     * @return a list of all teams
     */
    public List<Team> findTeams() {
        return teamRepository.findAllByOrderByNameAsc();
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

    public List<TeamWithStudiesDto> findTeamsWithStudies() {
        List<Team> teams = findTeams();
        List<TeamWithStudiesDto> dto = new ArrayList<>();
        teams.forEach(team -> {
            TeamWithStudiesDto teamWithStudies = teamMapper.toTeamWithStudiesDto(team);
            List<Study> studies = studyService.findAllStudies(team.getId());
            teamWithStudies.setStudies(studies);
            dto.add(teamWithStudies);
        });
        return dto;
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

        return teamRepository.save(team);
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
        Team team = findTeamById(teamId);
        
        if (team.getName().equals(teamDto.getName())) {
            return team;
        } else {
            Team oldTeam = team.toBuilder().build();
            team.setName(teamDto.getName());
            teamRepository.save(team);
            adminAuditService.auditUpdateTeam(team, oldTeam, adminId);

            return team;
        }
    }

    @Transactional
    public void updateTeamWithStudies(TeamWithStudiesUpdateDto teamDto) {
        teamDto.getStudyIds().forEach(study -> {
            TeamStudy access = TeamStudy.builder()
            .teamId(teamDto.getId())
            .studyId(study)
            .build();
            teamStudyRepository.save(access);
        });
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
