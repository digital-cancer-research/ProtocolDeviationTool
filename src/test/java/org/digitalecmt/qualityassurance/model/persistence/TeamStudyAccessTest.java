package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TeamStudyAccessTest {

    private TeamStudyAccess teamStudyAccess;

    @BeforeEach
    public void setUp() {
        teamStudyAccess = new TeamStudyAccess();
    }

    @Test
    public void testGetTeamStudyAccessId() {
        int id = 123;
        teamStudyAccess.setTeamStudyAccessId(id);

        assertEquals(id, teamStudyAccess.getTeamStudyAccessId());
    }

    @Test
    public void testSetTeamStudyAccessId() {
        int id = 456;
        teamStudyAccess.setTeamStudyAccessId(id);

        assertEquals(id, teamStudyAccess.getTeamStudyAccessId());
    }

    @Test
    public void testGetTeamId() {
        int teamId = 789;
        teamStudyAccess.setTeamId(teamId);

        assertEquals(teamId, teamStudyAccess.getTeamId());
    }

    @Test
    public void testSetTeamId() {
        int teamId = 101;
        teamStudyAccess.setTeamId(teamId);

        assertEquals(teamId, teamStudyAccess.getTeamId());
    }

    @Test
    public void testGetStudyId() {
        int studyId = 102;
        teamStudyAccess.setStudyId(studyId);

        assertEquals(studyId, teamStudyAccess.getStudyId());
    }

    @Test
    public void testSetStudyId() {
        int studyId = 103;
        teamStudyAccess.setStudyId(studyId);

        assertEquals(studyId, teamStudyAccess.getStudyId());
    }
}
