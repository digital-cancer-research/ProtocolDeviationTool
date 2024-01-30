package org.digitalecmt.qualityassurance.dto;

import java.util.List;

import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.model.persistence.UserAccount;

public class UserTeamDTO {
    private UserAccount user;
    private List<Team> teams;

    public UserAccount getUser() {
        return user;
    }

    public void setUser(UserAccount user) {
        this.user = user;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }
}