package org.digitalecmt.qualityassurance.repository;

import java.util.List;

import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.UserTeam;
import org.digitalecmt.qualityassurance.models.entities.UserTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserTeamRepository
    extends JpaRepository<UserTeam, UserTeamId> {

  @Query("SELECT t FROM Team t " +
      "JOIN UserTeam ut ON ut.teamId = t.id " +
      "WHERE ut.userId = :userId")
  public List<Team> findTeamsByUserId(@Param("userId") Long userId);

  @Modifying
  @Transactional
  @Query("DELETE FROM UserTeam ut WHERE ut.userId = :userId")
  public void deleteByUserId(@Param("userId") Long userId);
}
