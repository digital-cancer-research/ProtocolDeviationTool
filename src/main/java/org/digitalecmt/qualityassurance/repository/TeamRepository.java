/**
 * The MIT License (MIT)
 * <p>
 * Copyright (c) 2021 the original author or authors.
 * <p>
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * <p>
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.dto.TeamWithUsernameDTO;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for managing Team entities.
 * <p>
 * Provides methods for team and related data entries.
 * </p>
 */
@Repository
public interface TeamRepository
		extends JpaRepository<Team, Integer> {

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
	Long countByTeamId(@Param("teamId") Integer teamId);

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