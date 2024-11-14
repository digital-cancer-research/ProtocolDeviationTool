package org.digitalecmt.qualityassurance.controller.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.dto.StudyDTO;
import org.digitalecmt.qualityassurance.dto.TeamWithStudiesDTO;
import org.digitalecmt.qualityassurance.dto.Team.TeamCreationDto;
import org.digitalecmt.qualityassurance.dto.Team.TeamDetailsDto;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.model.persistence.TeamStudyAccess;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.TeamStudyAccessRepository;
import org.digitalecmt.qualityassurance.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * {@code TeamController} class provides REST API endpoints to manage teams
 * and their associated studies.
 * <p>
 * It supports the retrieval of team information, retrieval of study access for
 * teams,
 * and assigning study access to teams.
 * </p>
 */
@RestController
@RequestMapping("/api/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamStudyAccessRepository teamStudyAccessRepository;

    @Autowired
    private TeamService teamService;

    /**
     * Retrieves a list of teams, optionally including detailed information.
     * 
     * @param isDetailsRequired A boolean flag indicating whether detailed team
     *                          information is required.
     *                          If true, returns a list of TeamDetailsDto objects
     *                          with additional details.
     *                          If false, returns a list of basic Team objects.
     *                          Defaults to false if not specified.
     * @return A ResponseEntity containing either:
     *         - A List of TeamDetailsDto objects if details are requested, or
     *         - A List of Team objects if details are not requested.
     *         The HTTP status is OK (200) in both cases.
     */
    @GetMapping
    public ResponseEntity<?> getTeams(@RequestParam(required = false) boolean includeDetails) {
        if (includeDetails) {
            List<TeamDetailsDto> detailedTeams = teamService.findTeamsWithDetails();
            return new ResponseEntity<>(detailedTeams, HttpStatus.OK);
        } else {
            List<Team> teams = teamService.findTeams();
            return new ResponseEntity<>(teams, HttpStatus.OK);
        }
    }

    /**
     * Retrieves a team by its unique identifier.
     *
     * @param id The unique identifier of the team to be retrieved. This is a
     *           required path variable.
     * @return A ResponseEntity containing the Team object if found, with HTTP
     *         status 200 (OK).
     *         If the team is not found, the response will be handled by the global
     *         exception handler.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> findTeamById(
            @PathVariable Integer id,
            @RequestParam(required = false, defaultValue = "false") boolean includeDetails) {

        if (includeDetails) {
            return ResponseEntity.ok(teamService.findTeamWithDetailsById(id));
        } else {
            return ResponseEntity.ok(teamService.findTeamById(id));
        }
    }

    /**
     * Creates a new team based on the provided TeamCreationDto.
     * 
     * @param team A TeamCreationDto object containing the details of the team to be
     *             created.
     *             This is received as the request body.
     * @return A ResponseEntity containing the created Team object and HTTP status
     *         201 (Created).
     *         The Team object represents the newly created team with all its
     *         details.
     */
    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody TeamCreationDto team) {
        return new ResponseEntity<>(teamService.createTeam(team), HttpStatus.CREATED);
    }

    /**
     * Updates an existing team with the provided information.
     * 
     * @param team The Team object containing the updated information. This is
     *             required and
     *             received as the request body. It should include all the necessary
     *             fields
     *             for updating the team, including the team's ID.
     * @return A ResponseEntity containing the updated Team object and HTTP status
     *         201 (Created).
     *         The Team object represents the team after the update operation has
     *         been performed.
     */
    @PutMapping
    public ResponseEntity<Team> updateTeam(@RequestBody(required = true) Team team) {
        return new ResponseEntity<>(teamService.updateTeam(team), HttpStatus.CREATED);
    }

    /**
     * Deletes a team with the specified ID.
     *
     * @param id The unique identifier of the team to be deleted. This is a path
     *           variable.
     * @return A ResponseEntity with HTTP status 204 (No Content) indicating
     *         successful deletion of the team.
     *         If the team doesn't exist or cannot be deleted, an exception will be
     *         thrown and handled by the global exception handler.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTeam(@PathVariable Integer id) {
        teamService.deleteTeam(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Retrieves the studies associated with the specified team IDs.
     * <p>
     * If an empty list is provided provided, returns an empty list.
     * </p>
     *
     * @param teamIds an optional list of team IDs to retrieve study access for.
     * @return a {@code ResponseEntity} containing a list of
     *         {@code TeamWithStudiesDTO} objects
     *         and HTTP status code 200 (OK).
     *         In case of an error, returns HTTP status code 500 (Internal Server
     *         Error).
     */
    @GetMapping("/team-study-access")
    public ResponseEntity<List<TeamWithStudiesDTO>> getTeamStudyAccess(
            @RequestParam Optional<List<Integer>> teamIds) {
        try {
            List<TeamWithStudiesDTO> teamWithStudiesDTOs = new ArrayList<>();
            if (teamIds.isPresent()) {
                teamWithStudiesDTOs = getStudyIdsForTeamIds(teamIds.get());
            }
            return new ResponseEntity<>(teamWithStudiesDTOs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves study IDs associated with the given team IDs.
     *
     * @param teamIds a list of team IDs to retrieve study access for.
     * @return a list of {@code TeamWithStudiesDTO} containing the study IDs
     *         associated with each team ID.
     */
    private List<TeamWithStudiesDTO> getStudyIdsForTeamIds(List<Integer> teamIds) {
        List<TeamWithStudiesDTO> list = new ArrayList<>();
        if (teamIds.size() == 0) {
            teamIds = teamRepository.findTeamIds();
        }
        for (Integer id : teamIds) {
            list.add(TeamWithStudiesDTO.fromStringList(id, teamStudyAccessRepository.findTeamStudiesByTeamId(id)));
        }
        return list;
    }

    /**
     * Assigns study access to the specified teams.
     *
     * @param teamWithStudiesDTOList an array of {@code TeamWithStudiesDTO} objects
     *                               specifying
     *                               which teams should have access to which
     *                               studies.
     * @return a {@code ResponseEntity} with HTTP status code 201 (Created) if the
     *         assignment is successful.
     *         In case of an error, returns HTTP status code 500 (Internal Server
     *         Error).
     */
    @PostMapping("/team-study-access")
    public ResponseEntity<Void> giveTeamAccessToStudy(
            @RequestBody TeamWithStudiesDTO[] teamList) {
        try {
            for (TeamWithStudiesDTO team : teamList) {
                updateTeamStudyAccess(team);
            }
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Updates the study access for a given team {@code TeamWithStudiesDTO}.
     * <p>
     * For each study associated with the team:
     * - Adds the study to the team's access list if the study's flag is set to true
     * and it is not already in the table.
     * - Removes the study from the team's access list if the study's flag is set to
     * false and it is currently in the table.
     * </p>
     *
     * @param team a {@code TeamWithStudiesDTO} object containing the team ID and a
     *             list of studies with their access flags.
     */
    private void updateTeamStudyAccess(TeamWithStudiesDTO team) {
        Integer teamId = team.getTeamId();
        for (StudyDTO study : team.getStudies()) {

            boolean isTeamStudyInTable = teamStudyAccessRepository.doesTeamStudyExist(teamId, study.getStudyId()) == 1;
            if (study.getFlag() & !isTeamStudyInTable) {
                addTeamStudy(teamId, study.getStudyId());
            } else if (!study.getFlag() & isTeamStudyInTable) {
                deleteTeamStudyByTeamAndStudyId(teamId, study.getStudyId());
            }
        }
    }

    /**
     * Adds a study to the team's access list by creating a new
     * {@code TeamStudyAccess} entity
     * and saving it in the repository.
     *
     * @param teamId  the ID of the team to which the study access is to be added.
     * @param studyId the ID of the study to be added to the team's access list.
     */
    private void addTeamStudy(Integer teamId, String studyId) {
        TeamStudyAccess teamStudyAccess = new TeamStudyAccess();
        teamStudyAccess.setTeamId(teamId);
        teamStudyAccess.setStudyId(studyId);
        teamStudyAccessRepository.save(teamStudyAccess);
    }

    /**
     * Removes a study from the team's access list by deleting the
     * {@code TeamStudyAccess} entity
     * from the repository based on the team ID and study ID.
     *
     * @param teamId  the ID of the team from which the study access is to be
     *                removed.
     * @param studyId the ID of the study to be removed from the team's access list.
     */
    private void deleteTeamStudyByTeamAndStudyId(Integer teamId, String studyId) {
        Integer id = teamStudyAccessRepository.getIdByTeamAndStudy(teamId, studyId);
        teamStudyAccessRepository.deleteById(id);
    }
}
