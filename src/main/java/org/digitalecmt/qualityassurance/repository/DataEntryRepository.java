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

import org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryPerStudyDTO;
import org.digitalecmt.qualityassurance.dto.EntryCountPerSubcategoryPerCategoryDTO;
import org.digitalecmt.qualityassurance.model.persistence.DataEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DataEntryRepository
        extends JpaRepository<DataEntry, Integer> {
	
	Optional<DataEntry> findByStudyId(String studyId);
	
	List<DataEntry> findAllByStudyId(String studyId);

	List<DataEntry> findBySiteId(String siteId);
	
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.DataEntryDTO(d.entryId, d.studyId, ds.dvspondesValue, c.categoryId, c.dvterm, c.dvdecod, c.dvcat) " +
	           "FROM DataEntry d " +
	           "JOIN Dvspondes ds ON d.dvspondesId = ds.dvspondesId " +
	           "JOIN DataEntryCategory dec ON d.entryId = dec.entryId " +
	           "JOIN PdCategory c ON dec.categoryId = c.categoryId")
	List<Object[]> getJoinedData();
	
	@Query("select count(*) from DataEntry d JOIN DataEntryCategory dec ON d.entryId = dec.entryId left join PdCategory c on dec.categoryId=c.categoryId where c.dvcat like ?1")
	Long countByCategory(String category);

	@Query("SELECT DISTINCT d.siteId FROM DataEntry d")
	List<String> findDistinctSiteIds();

	Long countBySiteId(String siteId);

	@Query("SELECT COUNT(d) FROM DataEntry d JOIN DataEntryCategory dec ON d.entryId = dec.entryId JOIN PdCategory c ON dec.categoryId = c.categoryId WHERE c.dvcat = ?1 AND d.siteId = ?2")
	Long countByCategoryIdAndSiteId(String category, String siteId);

	Long countByStudyId(String study);

	Long countByStudyIdAndSiteId(String study, String siteId);
	
	@Query("SELECT DISTINCT studyId FROM DataEntry")
	List<String> findDistinctStudyIds();
	
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryPerStudyDTO(c.dvcat, COUNT(d), d.studyId) " +
		       "FROM DataEntry d " +
		       "JOIN DataEntryCategory dec ON d.entryId = dec.entryId " +
		       "JOIN PdCategory c ON dec.categoryId = c.categoryId " +
		       "WHERE (:siteId IS NULL OR d.siteId = :siteId) " +
		       "GROUP BY c.dvcat, d.studyId")
		List<EntryCountPerCategoryPerStudyDTO> countByCategoryAndStudy(@Param("siteId") String siteId);
	
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.EntryCountPerSubcategoryPerCategoryDTO(c.dvcat, c.dvdecod, COUNT(d)) " +
		       "FROM DataEntry d " +
		       "JOIN DataEntryCategory dec ON d.entryId = dec.entryId " +
		       "JOIN PdCategory c ON dec.categoryId = c.categoryId " +
		       "WHERE (:siteId IS NULL OR d.siteId = :siteId) " +
		       "GROUP BY c.dvcat, c.dvdecod")
		List<EntryCountPerSubcategoryPerCategoryDTO> countBySubcategoryAndCategory(@Param("siteId") String siteId);




}
