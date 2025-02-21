package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto;
import org.digitalecmt.qualityassurance.models.dto.Data.CategorisationDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.DvdecodPerStudyDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatDto;
import org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerStudyDto;
import org.digitalecmt.qualityassurance.models.entities.Data;
import org.digitalecmt.qualityassurance.models.entities.Dvcat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing and managing {@link Data} entities.
 * Extends {@link JpaRepository} to provide CRUD operations and additional JPA
 * functionalities.
 */
@Repository
public interface DataRepository extends JpaRepository<Data, Long> {

        /**
         * Counts the number of PDs for a given team.
         *
         * @param teamId the ID of the team
         * @return the count of PDs
         */
        @Query("SELECT COUNT(dc) " +
                        "FROM Data d " +
                        "JOIN DataCategory dc ON dc.dataId = d.id " +
                        "LEFT JOIN DataSubCategory dsc ON dsc.dataCategoryId = dc.id " +
                        "JOIN Dvcat dv ON dv.id = dc.dvcatId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS)
        public long countByTeamId(@Param("teamId") Long teamId);

        /**
         * Finds the PDs per DV category for a given team.
         *
         * @param teamId the ID of the team
         * @return a list of PDs per DV category
         */
        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerDvcatDto(dv.description, dv.colour, COUNT(dc) as count) "
                        +
                        "FROM Dvcat dv " +
                        "LEFT JOIN DataCategory dc ON dc.dvcatId = dv.id " +
                        "LEFT JOIN DataSubCategory dsc ON dsc.dataCategoryId = dc.id " +
                        "LEFT JOIN Data d ON d.id = dc.dataId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
                        "GROUP BY dv.description, dv.colour " +
                        "ORDER BY count ASC")
        public List<PdsPerDvcatDto> findPdsPerDvcatDtoByTeamId(@Param("teamId") Long teamId);

        /**
         * Finds the PDs per study for a given team.
         *
         * @param teamId the ID of the team
         * @return a list of PDs per study
         */
        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Visualisation.PdsPerStudyDto(s.externalStudyId, count(d) as count) "
                        +
                        "FROM Data d " +
                        "JOIN Study s ON s.id = d.studyId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
                        "GROUP BY s.externalStudyId " +
                        "ORDER BY count DESC")
        public List<PdsPerStudyDto> findPdsPerStudyDtosByTeamId(@Param("teamId") Long teamId);

        /**
         * Finds the DV categories per study ID.
         *
         * @param studyId the ID of the study
         * @return a list of DV categories per study
         */
        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Visualisation.DvcatPerStudyDto(dv.description, COUNT(d) as count, dv.colour) "
                        +
                        "FROM Dvcat dv " +
                        "LEFT JOIN DataCategory dc ON dc.dvcatId = dv.id " +
                        "LEFT JOIN Data d ON d.id = dc.dataId AND d.studyId = :studyId " +
                        "GROUP BY dv.description, dv.colour " +
                        "ORDER BY count")
        public List<DvcatPerStudyDto> findDvcatsPerStudyId(@Param("studyId") long studyId);

        @Query("SELECT dv " +
                        "FROM Dvcat dv " +
                        "LEFT JOIN DataCategory dc ON dc.dvcatId = dv.id " +
                        "LEFT JOIN Data d ON d.id = dc.dataId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
                        "GROUP BY dv.id, dv.colour " +
                        "ORDER BY count(d)")
        public List<Dvcat> findDvcatsSortedByTeamId(@Param("teamId") Long teamId);

        @Query("SELECT dv FROM Dvcat dv " +
                        "JOIN DataCategory dc ON dc.dvcatId = dv.id " +
                        "JOIN DataSubCategory dsc on dsc.dataCategoryId = dc.id " +
                        "JOIN Data d ON d.id = dc.dataId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
                        "GROUP BY dv.id " +
                        "ORDER BY count(d)")
        public List<Dvcat> findDvcatsSortedByDvdecodCountAndTeamId(@Param("teamId") Long teamId);

        @Query("SELECT dv FROM Dvcat dv " +
                        "JOIN DataCategory dc ON dc.dvcatId = dv.id " +
                        "JOIN DataSubCategory dsc on dsc.dataCategoryId = dc.id " +
                        "JOIN Data d ON d.id = dc.dataId " +
                        "JOIN Study s ON s.id = d.studyId " +
                        "WHERE s.externalStudyId = :study " +
                        "GROUP BY dv.id " +
                        "ORDER BY count(d)")
        public List<Dvcat> findDvcatsSortedByDvdecodCountAndStudy(@Param("study") String externalStudyId);

        /**
         * Finds the DVDECODs per study ID and team ID.
         *
         * @param studyId the ID of the study
         * @param teamId  the ID of the team
         * @return a list of DV decodes per study
         */
        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Visualisation.DvdecodPerStudyDto(dv.description, dvd.description, dvd.colour, count(dsc) as count) "
                        +
                        "FROM DataSubCategory dsc " +
                        "JOIN Dvdecod dvd ON dvd.id = dsc.dvdecodId " +
                        "JOIN DataCategory dc ON dc.id = dsc.dataCategoryId " +
                        "JOIN Dvcat dv ON dv.id = dc.dvcatId " +
                        "JOIN Data d ON d.id = dc.dataId " +
                        "JOIN Study s ON s.id = d.studyId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS +
                        "AND dc.dvcatId = :dvcatId " +
                        "GROUP BY dv.description, dvd.description, dvd.colour " +
                        "ORDER BY count DESC")
        public List<DvdecodPerStudyDto> findDvdecodByDvcatIdPerStudy(@Param("dvcatId") long dvcatId,
                        @Param("teamId") Long teamId);

        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Visualisation.DvdecodPerStudyDto(dv.description, dvd.description, dvd.colour, count(dsc) as count) "
                        +
                        "FROM DataSubCategory dsc " +
                        "JOIN Dvdecod dvd ON dvd.id = dsc.dvdecodId " +
                        "JOIN DataCategory dc ON dc.id = dsc.dataCategoryId " +
                        "JOIN Dvcat dv ON dv.id = dc.dvcatId " +
                        "JOIN Data d ON d.id = dc.dataId " +
                        "JOIN Study s ON s.id = d.studyId " +
                        "WHERE s.externalStudyId = :study " +
                        "AND dc.dvcatId = :dvcatId " +
                        "GROUP BY dv.description, dvd.description, dvd.colour " +
                        "ORDER BY count DESC")
        public List<DvdecodPerStudyDto> findDvdecodByDvcatIdPerStudy(@Param("dvcatId") long dvcatId,
                        @Param("study") String externalStudyId);

        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto(d.id, esm.externalSiteId, s.externalStudyId, d.dvspondes) "
                        +
                        "FROM Data d JOIN Study s ON d.studyId = s.id " +
                        "JOIN ExternalSiteMapping esm ON esm.id = d.mappingId " +
                        "WHERE " + QueryConstants.TEAM_HAS_STUDY_ACCESS)
        public List<BaseDataDto> findDataByTeam(@Param("teamId") Long teamId);

        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto(d.id, esm.externalSiteId, s.externalStudyId, d.dvspondes) "
                        +
                        "FROM Data d JOIN Study s ON d.studyId = s.id " +
                        "JOIN ExternalSiteMapping esm ON esm.id = d.mappingId " +
                        "WHERE s.externalStudyId = :study")
        public List<BaseDataDto> findDataByStudy(@Param("study") String externalStudyId);
        
        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Data.BaseDataDto(d.id, esm.externalSiteId, s.externalStudyId, d.dvspondes) "
                        +
                        "FROM Data d JOIN Study s ON d.studyId = s.id " +
                        "JOIN ExternalSiteMapping esm ON esm.id = d.mappingId " +
                        "WHERE d.id = :id")
        public List<BaseDataDto> findDataById(@Param("id") long id);

        @Query("SELECT new org.digitalecmt.qualityassurance.models.dto.Data.CategorisationDto(dv.description, dvd.description, dvd.dvterm) "
                        +
                        "FROM Data d " +
                        "JOIN DataCategory dc ON dc.dataId = d.id " +
                        "JOIN Dvcat dv ON dv.id = dc.dvcatId " +
                        "LEFT JOIN DataSubCategory dsc ON dsc.dataCategoryId = dc.id " +
                        "LEFT JOIN Dvdecod dvd ON dvd.id = dsc.dvdecodId " +
                        "WHERE d.id = :dataId")
        public List<CategorisationDto> findCategorisationByDataId(@Param("dataId") long id);
}
