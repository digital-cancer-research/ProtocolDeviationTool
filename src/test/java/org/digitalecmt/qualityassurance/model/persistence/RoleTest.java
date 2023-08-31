package org.digitalecmt.qualityassurance.model.persistence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class RoleTest {

    private Role role;

    @BeforeEach
    public void setUp() {
        role = new Role();
    }

    @Test
    public void testGetRoleId() {
        int id = 123;
        role.setRoleId(id);

        assertEquals(id, role.getRoleId());
    }

    @Test
    public void testSetRoleId() {
        int id = 456;
        role.setRoleId(id);

        assertEquals(id, role.getRoleId());
    }

    @Test
    public void testGetRoleName() {
        String name = "TestRole";
        role.setRoleName(name);

        assertEquals(name, role.getRoleName());
    }

    @Test
    public void testSetRoleName() {
        String name = "NewTestRole";
        role.setRoleName(name);

        assertEquals(name, role.getRoleName());
    }
}
