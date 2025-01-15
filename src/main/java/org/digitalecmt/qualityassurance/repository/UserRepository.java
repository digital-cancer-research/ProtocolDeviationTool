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
	
	@Query("SELECT t FROM Team t JOIN UserTeam ut ON t.id = ut.teamId JOIN User u ON ut.userId = u.id WHERE u.id = :userId")
	List<Team> findUserTeamsByUserId(@Param("userId") Long userId);
}
