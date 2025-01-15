package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.models.entities.UserTeam;
import org.digitalecmt.qualityassurance.models.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository
		extends JpaRepository<UserTeam, UserTeamId> {
}
