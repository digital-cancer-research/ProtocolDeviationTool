package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class UserTest {

    private UserAccount user;

    @BeforeEach
    public void setUp() {
        user = new UserAccount();
    }

    @Test
    public void testGetUserId() {
        int id = 123;
        user.setUserId(id);

        assertEquals(id, user.getUserId());
    }

    @Test
    public void testSetUserId() {
        int id = 456;
        user.setUserId(id);

        assertEquals(id, user.getUserId());
    }

    @Test
    public void testGetUsername() {
        String username = "testuser";
        user.setUsername(username);

        assertEquals(username, user.getUsername());
    }

    @Test
    public void testSetUsername() {
        String username = "newuser";
        user.setUsername(username);

        assertEquals(username, user.getUsername());
    }

    @Test
    public void testGetRoleId() {
        int roleId = 789;
        user.setRoleId(roleId);

        assertEquals(roleId, user.getRoleId());
    }

    @Test
    public void testSetRoleId() {
        int roleId = 101;
        user.setRoleId(roleId);

        assertEquals(roleId, user.getRoleId());
    }

    @Test
    public void testGetIsSite() {
        Boolean isSite = true;
        user.setIsSite(isSite);

        assertEquals(isSite, user.getIsSite());
    }

    @Test
    public void testSetIsSite() {
        Boolean isSite = false;
        user.setIsSite(isSite);

        assertEquals(isSite, user.getIsSite());
    }

    @Test
    public void testGetIsSponsor() {
        Boolean isSponsor = true;
        user.setIsSponsor(isSponsor);

        assertEquals(isSponsor, user.getIsSponsor());
    }

    @Test
    public void testSetIsSponsor() {
        Boolean isSponsor = false;
        user.setIsSponsor(isSponsor);

        assertEquals(isSponsor, user.getIsSponsor());
    }
}
