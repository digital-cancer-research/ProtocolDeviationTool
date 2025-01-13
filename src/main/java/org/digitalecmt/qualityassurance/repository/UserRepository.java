package org.digitalecmt.qualityassurance.repository;

import java.util.Optional;

import org.digitalecmt.qualityassurance.dto.UserWithRoleDTO;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);
	
	@Query("SELECT new org.digitalecmt.qualityassurance.dto.UserWithRoleDTO(u.userId, u.username, u.dateCreated, u.roleId, r.roleName) " + 
		       "FROM UserAccount u " + 	
		       "JOIN Role r ON u.roleId = r.roleId")
		List<UserWithRoleDTO> findUsersWithRoles();

	@Query("SELECT u.userId FROM UserAccount u WHERE u.username = :username")
    Long getUserIdByUsername(@Param("username") String username);
	
}
