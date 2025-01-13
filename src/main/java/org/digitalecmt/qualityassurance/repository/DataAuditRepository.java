package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.DataAudit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataAuditRepository extends JpaRepository<DataAudit, Long> {

}
