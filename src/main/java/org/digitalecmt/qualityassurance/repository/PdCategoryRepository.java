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
import java.util.Optional;

import org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodRepositoryDataDTO;
import org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO;
import org.digitalecmt.qualityassurance.model.persistence.PdCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PdCategoryRepository
		extends JpaRepository<PdCategory, Integer> {

	Optional<PdCategory> findByDvterm(String dvterm);

	@Query("SELECT DISTINCT dvcat FROM PdCategory")
	List<String> findDistinctDVCat();

	Optional<PdCategory> findByDvdecod(String dvdecod);

	List<PdCategory> findByDvtermIn(List<String> dvterms);

	List<PdCategory> findByDvdecodIn(List<String> dvdecods);

	/**
	 * Retrieves a list of `PdCategoryGraphDataDTO` objects representing category
	 * data
	 * for visualisations. The data includes the category name (`dvcat`), the
	 * associated
	 * color, and the count of related entries for a given team.
	 * 
	 * @param teamId the ID of the team for which to retrieve the category data.
	 * @return a list of `PdCategoryGraphDataDTO` containing the category name
	 *         (`dvcat`),
	 *         the associated color, and the count of related entries for that
	 *         category.
	 */
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.Visualisation.PdCategoryGraphDataDTO" +
			"(pc.dvcat, dc.colour, COUNT(dec)) " +
			"FROM PdCategory pc " +
			"JOIN DvcatColour dc ON dc.dvcat = pc.dvcat " +
			"JOIN DataEntryCategory dec ON dec.categoryId = pc.categoryId " +
			"JOIN DataEntry de ON de.entryId = dec.entryId " +
			"WHERE de.studyId IN (" +
			"    SELECT tsa.studyId " +
			"    FROM TeamStudyAccess tsa " +
			"    WHERE tsa.teamId = :teamId" +
			") " +
			"GROUP BY pc.dvcat, dc.colour")
	List<PdCategoryGraphDataDTO> findPdCategoryGraphDataByTeamId(@Param("teamId") Integer teamId);

	@Query("SELECT new org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodRepositoryDataDTO" +
			"(pc.dvcat, pc.dvdecod, COUNT(dec), dc.colour) " +
			"FROM DataEntry de " +
			"JOIN DataEntryCategory dec ON dec.entryId = de.entryId " +
			"JOIN PdCategory pc ON pc.categoryId = dec.categoryId " +
			"JOIN DvdecodColour dc ON dc.dvdecod = pc.dvdecod " +
			"WHERE de.studyId IN (" +
			"  SELECT tsa.studyId " +
			"  FROM TeamStudyAccess tsa " +
			"  WHERE tsa.teamId = :teamId" +
			") " +
			"GROUP BY pc.dvcat, pc.dvdecod, dc.colour")
	List<DvcatDvdecodRepositoryDataDTO> findPdCategoryBreakdownDataByTeamId(@Param("teamId") Integer teamId);

	@Query("SELECT pc.dvdecod " +
	"FROM PdCategory pc")
	List<String> findDvdecods();

	@Query("SELECT pc.dvdecod " +
	"FROM PdCategory pc " +
	"WHERE pc.dvcat = :dvcat")
	List<String> findDvdecodsByDvcat(@Param("dvcat") String dvcat);
	
	@Query("SELECT pc.dvterm " +
	"FROM PdCategory pc")
	List<String> findDvterms();

	@Query("SELECT pc.dvterm " +
	"FROM PdCategory pc " +
	"WHERE pc.dvdecod = :dvdecod")
	String findDvtermByDvdecod(@Param("dvdecod") String dvdecod);
}