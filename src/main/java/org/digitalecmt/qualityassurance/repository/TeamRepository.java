package org.digitalecmt.qualityassurance.repository;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto;
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

       Optional<Team> findByName(String name);

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
       @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto(" +
                     "t.id, t.name, t.createdBy, t.dateCreated, u.username) " +
                     "FROM Team t JOIN User u ON t.createdBy = u.id " + 
                     "ORDER BY t.name ASC")
       List<TeamWithAdminUsernameDto> findTeamsWithAdminUsername();

       /**
        * Retrieves a team with the username of the user who created this team by team
        * ID.
        * <p>
        * Performs a join between the Team and UserAccount entities
        * to fetch additional user information for the specified team.
        * </p>
        *
        * @param teamId the ID of the team to retrieve
        * @return an {@code Optional} containing the {@code TeamWithUsernameDTO} object
        *         if found
        */
       @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Team.TeamWithAdminUsernameDto(" +
                     "t.id, t.name, t.dateCreated, u.username) " +
                     "FROM Team t JOIN User u ON t.createdBy = u.id WHERE t.id = :teamId " +
                     "ORDER BY t.name ASC")
       Optional<TeamWithAdminUsernameDto> findTeamWithAdminUsername(@Param("teamId") Long teamId);

       List<Team> findAllByOrderByNameAsc();
}