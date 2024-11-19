package org.digitalecmt.qualityassurance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.digitalecmt.qualityassurance.dto.Team.TeamCreationDto;
import org.digitalecmt.qualityassurance.dto.Team.TeamDetailsDto;
import org.digitalecmt.qualityassurance.exceptions.TeamNotFoundException;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<Team> findTeams() {
        return teamRepository.findAll();
    }

    public List<TeamDetailsDto> findTeamsWithDetails() {
        return teamRepository.findAll().stream()
                .map(team -> TeamDetailsDto.mapToDetailedTeam(team, userAccountRepository))
                .collect(Collectors.toList());
    }

    public Team findTeamById(Integer teamId) {
        return teamRepository.findById(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
    }

    public TeamDetailsDto findTeamWithDetailsById(Integer teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
        return TeamDetailsDto.mapToDetailedTeam(team, userAccountRepository);
    }

    public Team createTeam(TeamCreationDto team) {
        return teamRepository.save(TeamCreationDto.mapper(team));
    }

    public Team updateTeam(Team team) {
        Team currentTeam = teamRepository.findById(team.getTeamId())
                .orElseThrow(() -> new TeamNotFoundException(team.getTeamId()));
        currentTeam.setTeamName(team.getTeamName());
        return teamRepository.save(currentTeam);
    }

    public void deleteTeam(Integer teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new TeamNotFoundException(teamId));
        teamRepository.delete(team);
    }

}
