package org.digitalecmt.qualityassurance.repository;

import java.util.List;
import java.util.Optional;

import org.digitalecmt.qualityassurance.models.dto.EntryCountPerCategoryPerStudyDTO;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Data} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DataRepository extends JpaRepository<Data, Long> {

	Optional<Data> findByStudyId(String studyId);

	List<Data> findAllByStudyId(String studyId);

	List<Data> findBySiteId(String siteId);

	@Query("SELECT new org.digitalecmt.qualityassurance.dto.DataEntryDTO(d.entryId, d.studyId, ds.dvspondesValue, c.categoryId, c.dvterm, c.dvdecod, c.dvcat) "
			+
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

	@Query("SELECT new org.digitalecmt.qualityassurance.dto.EntryCountPerCategoryPerStudyDTO(c.dvcat, COUNT(d), d.studyId) "
			+
			"FROM DataEntry d " +
			"JOIN DataEntryCategory dec ON d.entryId = dec.entryId " +
			"JOIN PdCategory c ON dec.categoryId = c.categoryId")
	List<EntryCountPerCategoryPerStudyDTO> getEntryCountPerCategoryPerStudy();
}
