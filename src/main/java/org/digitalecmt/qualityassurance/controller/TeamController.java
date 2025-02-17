package org.digitalecmt.qualityassurance.controller;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Team.TeamCreateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
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
    public ResponseEntity<?> getTeams(@RequestParam(required = false, name = "includeDetails") boolean includeDetails) {
        if (includeDetails) {
            List<TeamWithAdminUsernameDto> detailedTeams = teamService.findTeamsWithAdminUsername();
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
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "false") boolean includeDetails) {

        if (includeDetails) {
            return ResponseEntity.ok(teamService.findTeamWithAdminNameById(id));
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
    public ResponseEntity<Team> createTeam(@RequestBody TeamCreateDto team) {
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
    @PutMapping("/{id}")
    public ResponseEntity<Team> updateTeam(@RequestBody(required = true) TeamUpdateDto team) {
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
    public ResponseEntity<HttpStatus> deleteTeam(@PathVariable("id") long teamId, @RequestParam("adminId") long adminId) {
        TeamDeleteDto deleteDto = new TeamDeleteDto(adminId, teamId);
        teamService.deleteTeam(deleteDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
