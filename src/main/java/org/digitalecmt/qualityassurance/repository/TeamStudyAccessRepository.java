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

import org.digitalecmt.qualityassurance.model.persistence.TeamStudyAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and manipulating {@link TeamStudyAccess}
 * entities in the database.
 * <p>
 * Extends the {@link JpaRepository} to provide CRUD operations for the
 * {@link TeamStudyAccess} entity.
 * Also provides a custom query method to retrieve study IDs associated with a
 * specific team ID.
 * </p>
 */

@Repository
public interface TeamStudyAccessRepository
                extends JpaRepository<TeamStudyAccess, Integer> {

        /**
         * Finds the list of study IDs associated with the specified team ID.
         * 
         * @param teamId the ID of the team for which to retrieve associated study IDs
         * @return a list of study IDs associated with the given team ID
         */
        @Query("SELECT tsa.studyId " +
                        "FROM TeamStudyAccess tsa " +
                        "WHERE tsa.teamId = :teamId")
        List<String> findTeamStudiesByTeamId(@Param("teamId") Integer teamId);

        @Query("SELECT COUNT(1) " +
                "FROM TeamStudyAccess tsa " +
                "WHERE tsa.teamId = :teamId AND tsa.studyId = :studyId")
        Integer doesTeamStudyExist(@Param("teamId") Integer teamId, @Param("studyId") String studyId);

        @Query("SELECT tsa.id " +
                "FROM TeamStudyAccess tsa " +
                "WHERE tsa.teamId = :teamId AND tsa.studyId = :studyId")
        Integer getIdByTeamAndStudy(@Param("teamId") Integer teamId, @Param("studyId") String studyId);
}
