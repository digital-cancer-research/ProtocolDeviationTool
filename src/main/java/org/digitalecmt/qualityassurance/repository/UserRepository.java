package org.digitalecmt.qualityassurance.repository;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);
	
    Optional<Long> findIdByUsername(@Param("username") String username);

	@Query("SELECT * FROM Team t JOIN UserTeam ut ON t.teamId = ut.teamId JOIN User u ON ut.userId = u.userId WHERE u.userId = :userId")
	List<Team> findUserTeamsByUserId(@Param("userId") Long userId);
}
