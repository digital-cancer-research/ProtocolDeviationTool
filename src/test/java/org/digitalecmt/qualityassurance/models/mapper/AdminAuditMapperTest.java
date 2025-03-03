package org.digitalecmt.qualityassurance.models.mapper;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {
        AdminAuditMapperImpl.class
})
public class AdminAuditMapperTest {

    User user = User.builder()
            .id(1L)
            .username("johndoe@example.com")
            .role(Role.USER)
            .isSite(true)
            .isSponsor(true)
            .dateCreated(LocalDateTime.now())
            .build();

    Team team = Team.builder()
            .id(1L)
            .name("Cardiovascular Research Team")
            .build();

    @Test
    public void shouldGenerateCreateUserMappingMethod() {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToCreateUserAdminAudit(user, 2L);

        assertNotNull(audit);
        assertNull(audit.getId());
        assertEquals(2L, audit.getUserId());
        assertEquals(user.getUsername(), audit.getEntity());
        assertNotNull(audit.getAction());
        assertNotNull(audit.getOriginalValue());
        assertNotNull(audit.getNewValue());
        assertNull(audit.getDate());
    }

    @Test
    public void shouldGenerateUpdateUserMappingMethod() {
        User newUser = User.builder()
                .id(1L)
                .username("jimdoe@example.com")
                .role(Role.ADMIN)
                .isSite(true)
                .isSponsor(true)
                .dateCreated(LocalDateTime.now())
                .build();

        AdminAudit audit = AdminAuditMapper.INSTANCE.userToUpdateUserAdminAudit(newUser, user, 2L);

        assertNotNull(audit);
        assertNull(audit.getId());
        assertEquals(2L, audit.getUserId());
        assertEquals(user.getUsername(), audit.getEntity());
        assertNotNull(audit.getAction());
        assertEquals(user.getAuditDetails(), audit.getOriginalValue());
        assertEquals(newUser.getAuditDetails(), audit.getNewValue());
        assertNull(audit.getDate());
    }

    @Test
    public void shouldGenerateDeleteUserMappingMethod() {
        AdminAudit audit = AdminAuditMapper.INSTANCE.userToDeleteUserAdminAudit(user, 2L);

        assertNotNull(audit);
        assertNull(audit.getId());
        assertEquals(2L, audit.getUserId());
        assertEquals(user.getUsername(), audit.getEntity());
        assertNotNull(audit.getAction());
        assertEquals(user.getAuditDetails(), audit.getOriginalValue());
        assertNotNull(audit.getNewValue());
        assertNull(audit.getDate());
    }

    @Test
        public void shouldGenerateAddUserToTeamMappingMethod() {
                AdminAudit audit = AdminAuditMapperImpl.INSTANCE.userToAddUserToTeamAdminAudit(user, team, 2L);

                assertNotNull(audit);
                assertNull(audit.getId());
                assertEquals(2L, audit.getUserId());
                assertEquals(user.getUsername(), audit.getEntity());
                assertNotNull(audit.getAction());
                assertNotNull(audit.getOriginalValue());
                assertEquals(team.getName(), audit.getNewValue());
                assertNull(audit.getDate());
        }
}
