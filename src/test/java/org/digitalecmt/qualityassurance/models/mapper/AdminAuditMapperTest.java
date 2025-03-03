package org.digitalecmt.qualityassurance.models.mapper;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
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
        @Test
        public void shouldGenerateCreateUserMappingMethod() {
                User user = User.builder()
                                .id(1L)
                                .username("johndoe@example.com")
                                .role(Role.USER)
                                .isSite(true)
                                .isSponsor(true)
                                .dateCreated(LocalDateTime.now())
                                .build();

                AdminAudit audit = AdminAuditMapper.INSTANCE.userToCreateUserAdminAudit(user, 2L);

                assertNotNull(audit);
                assertNull(audit.getId());
                assertEquals(audit.getUserId(), 2L);
                assertEquals(audit.getEntity(), user.getUsername());
                assertNotNull(audit.getAction());
                assertNotNull(audit.getOriginalValue());
                assertNotNull(audit.getNewValue());
                assertNull(audit.getDate());
        }
}
