package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.dto.TeamWithUsernameDTO;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Team} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
	/**
	 * Retrieves a list of teams with the username of the user who created this
	 * team.
	 * <p>
	 * Performs a join between the Team and UserAccount entities
	 * to fetch additional user information for each team.
	 * </p>
	 *
	 * @return a list of {@code TeamWithUsernameDTO} objects containing team and
	 *         user information.
	 */
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.TeamWithUsernameDTO(t.teamId, t.teamName, t.dateCreated, t.userId, u.username) "
			+
			"FROM Team t " +
			"JOIN UserAccount u ON t.userId = u.userId")
	List<TeamWithUsernameDTO> findTeamsWithUsername();

	/**
	 * Counts the number of data entries associated with a given team.
	 * <p>
	 * Joins the DataEntry and TeamStudyAccess entities to count
	 * the number of data entries linked to a specific team by its ID.
	 * </p>
	 *
	 * @param teamId the ID of the team.
	 * @return the count of data entries associated with the given team ID.
	 */
	@Query("SELECT COUNT(d) " +
			"FROM DataEntry d " +
			"JOIN TeamStudyAccess tsa ON d.studyId = tsa.studyId " +
			"WHERE tsa.teamId = :teamId")
	Long countByTeamId(@Param("teamId") Long teamId);

	/**
	 * Retrieves a list of all team IDs.
	 * <p>
	 * Selects the IDs of all teams from the Team entity.
	 * </p>
	 *
	 * @return a list of all team IDs.
	 */
	@Query("SELECT t.teamName " +
			"FROM Team t")
	List<Integer> findTeamIds();
}