package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.AdminAuditDto;
import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link AdminAudit} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface AdminAuditRepository extends JpaRepository<AdminAudit, Long> {

    @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Audit.AdminAuditDto(u.username, aa.date, aa.entity, aa.action, aa.originalValue, aa.newValue)"
            +
            "FROM AdminAudit aa " +
            "JOIN User u ON aa.userId = u.id " + 
            "ORDER BY aa.date DESC")
    public List<AdminAuditDto> findAllAudits();
}
