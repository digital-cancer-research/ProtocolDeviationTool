package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.dto.AuditTrailDTO;
import org.digitalecmt.qualityassurance.models.entities.AdminAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link AdminAudit} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA functionalities.
 */
@Repository
public interface AdminAuditRepository extends JpaRepository<AdminAudit, Long> {

    /**
     * Retrieves all audit trails with user information.
     *
     * @return a list of {@link AuditTrailDTO} containing audit trail details
     */
    @Query("SELECT new org.digitalecmt.qualityassurance.dto.AuditTrailDTO(a.auditTrailId, a.userId, u.username, a.entityChanged, a.attributeChanged, a.changeFrom, a.changeTo, a.dateTimeEdited) "
            +
            "FROM AuditTrail a " +
            "JOIN UserAccount u ON a.userId = u.userId")
    List<AuditTrailDTO> findAllAuditTrails();
}
