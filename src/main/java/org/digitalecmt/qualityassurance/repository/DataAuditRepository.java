package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Audit.DataAuditDto;
import org.digitalecmt.qualityassurance.models.entities.DataAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link DataAudit} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DataAuditRepository extends JpaRepository<DataAudit, Long> {

    @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Audit.DataAuditDto(u.username, s.externalStudyId, d.dvspondes, da.originalValue, da.newValue, da.date) "
            +
            "FROM DataAudit da " +
            "JOIN User u ON u.id = da.userId " +
            "JOIN Data d ON d.id = da.dataId " +
            "JOIN Study s ON s.id = d.studyId " + 
            "ORDER BY da.date")
    public List<DataAuditDto> findAllAudits();
}
