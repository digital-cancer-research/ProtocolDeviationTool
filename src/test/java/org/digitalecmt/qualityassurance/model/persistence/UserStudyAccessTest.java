package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


public class UserStudyAccessTest {

    private UserStudyAccess userStudyAccess;

    @BeforeEach
    public void setUp() {
        userStudyAccess = new UserStudyAccess();
    }

    @Test
    public void testGetUserStudyAccessId() {
        int id = 123;
        userStudyAccess.setUserStudyAccessId(id);

        assertEquals(id, userStudyAccess.getUserStudyAccessId());
    }

    @Test
    public void testSetUserStudyAccessId() {
        int id = 456;
        userStudyAccess.setUserStudyAccessId(id);

        assertEquals(id, userStudyAccess.getUserStudyAccessId());
    }

    @Test
    public void testGetUserId() {
        int userId = 789;
        userStudyAccess.setUserId(userId);

        assertEquals(userId, userStudyAccess.getUserId());
    }

    @Test
    public void testSetUserId() {
        int userId = 101;
        userStudyAccess.setUserId(userId);

        assertEquals(userId, userStudyAccess.getUserId());
    }

    @Test
    public void testGetStudyId() {
    	String studyId = "102";
        userStudyAccess.setStudyId(studyId);

        assertEquals(studyId, userStudyAccess.getStudyId());
    }

    @Test
    public void testSetStudyId() {
    	String studyId = "103";
        userStudyAccess.setStudyId(studyId);

        assertEquals(studyId, userStudyAccess.getStudyId());
    }
}
