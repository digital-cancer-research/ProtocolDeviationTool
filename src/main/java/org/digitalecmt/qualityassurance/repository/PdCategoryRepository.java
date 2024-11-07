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

	/**
	 * Finds a `PdCategory` by its `dvterm`.
	 *
	 * @param dvterm the term to find.
	 * @return an `Optional` containing the found `PdCategory`, if any.
	 */
	Optional<PdCategory> findByDvterm(String dvterm);

	/**
	 * Retrieves a distinct list of `dvcat` values from all `PdCategory` entries.
	 *
	 * @return a list of distinct `dvcat` values.
	 */
	@Query("SELECT DISTINCT dvcat FROM PdCategory")
	List<String> findDistinctDVCat();

	/**
	 * Finds a `PdCategory` by its `dvdecod`.
	 *
	 * @param dvdecod the code to find.
	 * @return an `Optional` containing the found `PdCategory`, if any.
	 */
	Optional<PdCategory> findByDvdecod(String dvdecod);

	/**
	 * Finds a list of `PdCategory` entries by their `dvcat` values.
	 *
	 * @param dvcats the categories to find.
	 * @return a list of `PdCategory` entries.
	 */
	List<PdCategory> findByDvtermIn(List<String> dvterms);

	/**
	 * Finds a list of `PdCategory` entries by their `dvdecod` values.
	 *
	 * @param dvdecods the codes to find.
	 * @return a list of `PdCategory` entries.
	 */
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

	/**
	 * Retrieves a list of `PdCategoryGraphDataDTO` objects representing category
	 * data
	 * for visualisations. The data includes the category name (`dvcat`), the
	 * associated
	 * color, and the count of related entries for a given study.
	 * 
	 * @param studyId the ID of the study for which to retrieve the category data.
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
			"WHERE de.studyId = studyId " +
			"GROUP BY pc.dvcat, dc.colour")
	List<PdCategoryGraphDataDTO> findPdCategoryGraphDataByStudyId(@Param("studyId") String studyId);

	/**
	 * Retrieves a list of `DvcatDvdecodRepositoryDataDTO` objects representing
	 * category
	 * breakdown data for visualisations. The data includes a list of entries with
	 * the category name (`dvcat`), the dvdecod,
	 * the associated color, and the count of dvdecods for the dvdcat for a given
	 * team.
	 *
	 * @param teamId
	 * @return a list of `DvcatDvdecodRepositoryData
	 *
	 */
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
			"GROUP BY de.studyId, pc.dvcat, pc.dvdecod, dc.colour")
	List<DvcatDvdecodRepositoryDataDTO> findPdCategoryBreakdownDataByTeamId(@Param("teamId") Integer teamId);

	/**
	 * Retrieves a list of `DvcatDvdecodRepositoryDataDTO` objects representing
	 * category
	 * breakdown data for visualisations. The data includes a list of entries with
	 * the category name (`dvcat`), the dvdecod,
	 * the associated color, and the count of dvdecods for the dvdcat for a given
	 * study.
	 *
	 * @param studyId
	 * @return a list of `DvcatDvdecodRepositoryData
	 *
	 */
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.Visualisation.DvcatDvdecodRepositoryDataDTO" +
			"(pc.dvcat, pc.dvdecod, COUNT(dec), dc.colour) " +
			"FROM DataEntry de " +
			"JOIN DataEntryCategory dec ON dec.entryId = de.entryId " +
			"JOIN PdCategory pc ON pc.categoryId = dec.categoryId " +
			"JOIN DvdecodColour dc ON dc.dvdecod = pc.dvdecod " +
			"WHERE de.studyId = :studyId " +
			"GROUP BY de.studyId, pc.dvcat, pc.dvdecod, dc.colour")
	List<DvcatDvdecodRepositoryDataDTO> findPdCategoryBreakdownDataByStudyId(@Param("studyId") String studyId);

	/**
	 * Retrieves all `dvdecod` values from `PdCategory`.
	 *
	 * @return a list of `dvdecod` values.
	 */
	@Query("SELECT pc.dvdecod " +
			"FROM PdCategory pc")
	List<String> findDvdecods();

	/**
	 * Retrieves all `dvdecod` values for a specific `dvcat`.
	 *
	 * @param dvcat the category to filter `dvdecod` values by.
	 * @return a list of `dvdecod` values for the given category.
	 */
	@Query("SELECT pc.dvdecod " +
			"FROM PdCategory pc " +
			"WHERE pc.dvcat = :dvcat")
	List<String> findDvdecodsByDvcat(@Param("dvcat") String dvcat);

	/**
     * Retrieves all `dvterm` values from `PdCategory`.
     *
     * @return a list of `dvterm` values.
     */
	@Query("SELECT pc.dvterm " +
			"FROM PdCategory pc")
	List<String> findDvterms();

	/**
     * Finds the `dvterm` associated with a specific `dvdecod`.
     *
     * @param dvdecod the code to find the term for.
     * @return the `dvterm` associated with the given `dvdecod`.
     */
	@Query("SELECT pc.dvterm " +
			"FROM PdCategory pc " +
			"WHERE pc.dvdecod = :dvdecod")
	String findDvtermByDvdecod(@Param("dvdecod") String dvdecod);
}