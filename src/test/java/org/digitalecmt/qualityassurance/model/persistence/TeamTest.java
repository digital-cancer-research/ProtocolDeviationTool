package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TeamTest {

    private Team team;

    @BeforeEach
    public void setUp() {
        team = new Team();
    }

    @Test
    public void testGetTeamId() {
        int id = 123;
        team.setTeamId(id);

        assertEquals(id, team.getTeamId());
    }

    @Test
    public void testSetTeamId() {
        int id = 456;
        team.setTeamId(id);

        assertEquals(id, team.getTeamId());
    }

    @Test
    public void testGetTeamName() {
        String name = "TestTeam";
        team.setTeamName(name);

        assertEquals(name, team.getTeamName());
    }

    @Test
    public void testSetTeamName() {
        String name = "NewTestTeam";
        team.setTeamName(name);

        assertEquals(name, team.getTeamName());
    }
}
