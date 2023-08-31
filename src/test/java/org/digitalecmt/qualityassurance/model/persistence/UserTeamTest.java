package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UserTeamTest {

    private UserTeam userTeam;

    @BeforeEach
    public void setUp() {
        userTeam = new UserTeam();
    }

    @Test
    public void testGetUserTeamId() {
        int id = 123;
        userTeam.setUserTeamId(id);

        assertEquals(id, userTeam.getUserTeamId());
    }

    @Test
    public void testSetUserTeamId() {
        int id = 456;
        userTeam.setUserTeamId(id);

        assertEquals(id, userTeam.getUserTeamId());
    }

    @Test
    public void testGetUserId() {
        int userId = 789;
        userTeam.setUserId(userId);

        assertEquals(userId, userTeam.getUserId());
    }

    @Test
    public void testSetUserId() {
        int userId = 101;
        userTeam.setUserId(userId);

        assertEquals(userId, userTeam.getUserId());
    }

    @Test
    public void testGetTeamId() {
        int teamId = 102;
        userTeam.setTeamId(teamId);

        assertEquals(teamId, userTeam.getTeamId());
    }

    @Test
    public void testSetTeamId() {
        int teamId = 103;
        userTeam.setTeamId(teamId);

        assertEquals(teamId, userTeam.getTeamId());
    }
}
