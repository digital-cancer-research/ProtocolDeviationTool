package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.dto.UserWithTeamDTO;
import org.digitalecmt.qualityassurance.models.entities.UserTeam;
import org.digitalecmt.qualityassurance.models.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTeamRepository
		extends JpaRepository<UserTeam, UserTeamId> {

	void deleteByUserId(int userId);

	@Query("SELECT new org.digitalecmt.qualityassurance.dto.UserWithTeamDTO(ut.userId, ut.teamId, t.teamName) " +
			"FROM UserTeam ut " +
			"JOIN Team t ON ut.teamId = t.teamId")
	List<UserWithTeamDTO> findUsersWithTeams();

	@Query("SELECT new org.digitalecmt.qualityassurance.dto.UserWithTeamDTO(ut.userId, ut.teamId, t.teamName) " +
			"FROM UserTeam ut " +
			"JOIN Team t ON ut.teamId = t.teamId " +
			"WHERE ut.userId = :userId")
	List<UserWithTeamDTO> findUserTeamsByUserId(@Param("userId") Long userId);

	List<UserTeam> findByUserId(int userId);
}
