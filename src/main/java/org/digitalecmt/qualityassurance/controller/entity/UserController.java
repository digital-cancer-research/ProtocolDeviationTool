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

package org.digitalecmt.qualityassurance.controller.entity;

import org.digitalecmt.qualityassurance.dto.TeamWithUsernameDTO;
import org.digitalecmt.qualityassurance.dto.AuditTrailDTO;
import org.digitalecmt.qualityassurance.dto.RoleChangeDTO;
import org.digitalecmt.qualityassurance.dto.TeamChangeDTO;
import org.digitalecmt.qualityassurance.dto.UserTeamDTO;
import org.digitalecmt.qualityassurance.dto.UserWithRoleDTO;
import org.digitalecmt.qualityassurance.dto.UserWithRoleTeamDTO;
import org.digitalecmt.qualityassurance.dto.UserWithTeamDTO;
import org.digitalecmt.qualityassurance.model.persistence.UserAccount;
import org.digitalecmt.qualityassurance.model.persistence.UserTeam;
import org.digitalecmt.qualityassurance.model.persistence.AuditTrail;
import org.digitalecmt.qualityassurance.model.persistence.CategoryEditAudit;
import org.digitalecmt.qualityassurance.model.persistence.CurrentSites;
import org.digitalecmt.qualityassurance.model.persistence.DataEntryCategory;
import org.digitalecmt.qualityassurance.model.persistence.Role;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.repository.AuditTrailRepository;
import org.digitalecmt.qualityassurance.repository.CurrentSitesRepository;
import org.digitalecmt.qualityassurance.repository.DataEntryRepository;
import org.digitalecmt.qualityassurance.repository.RoleRepository;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.UserAccountRepository;
import org.digitalecmt.qualityassurance.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.interceptor.TransactionAspectSupport;
import org.springframework.web.bind.annotation.*;

import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private Logger log = Logger.getLogger(UserController.class.getName());
	
	private String currentUsername = "Default User";
    private Integer currentUserId = 1;
	
    @Autowired
    private UserAccountRepository userRepository;
    
    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private UserTeamRepository userTeamRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private DataEntryRepository dataEntryRepository;
    
    @Autowired
    private CurrentSitesRepository currentSitesRepository;
    
    @Autowired
    private AuditTrailRepository auditTrailRepository;
    
    @PostMapping("/setCurrentUser")
    public ResponseEntity<Void> setCurrentUser(@RequestBody String username) {
        this.currentUsername = username;
        this.currentUserId = userRepository.getUserIdByUsername(username);
        
        if (currentUserId == null) {
            // Handle case where userId could not be retrieved
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }
    
    // Create a new user
    @PostMapping
    public ResponseEntity<UserAccount> createUser(@RequestBody UserAccount user) {
        try {
        	UserAccount newUser = userRepository.save(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserAccount>> getAllUsers() {
    	try {
	        List<UserAccount> users = userRepository.findAll();
	        return new ResponseEntity<>(users, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a single user by ID
    @GetMapping("/{userId}")
    public ResponseEntity<UserAccount> getUserById(@PathVariable int userId) {
        Optional<UserAccount> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a user by ID
    @PutMapping("/{userId}")
    public ResponseEntity<UserAccount> updateUser(@PathVariable int userId, @RequestBody UserAccount user) {
        Optional<UserAccount> userData = userRepository.findById(userId);

        if (userData.isPresent()) {
            UserAccount existingUser = userData.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setRoleId(user.getRoleId());
            existingUser.setIsSite(user.getIsSite());
            existingUser.setIsSponsor(user.getIsSponsor());
            return new ResponseEntity<>(userRepository.save(existingUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a user by ID
    @DeleteMapping("/{userId}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable int userId) {
        try {
            userRepository.deleteById(userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
	// Check if current user is an admin
    @GetMapping("/check-admin-role")
    public ResponseEntity<Boolean> checkAdminRole(@RequestParam String username) {
        // Use the username to fetch the user's role from the database
        Optional<UserAccount> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isPresent()) {
            UserAccount user = optionalUser.get();
            // Check if the user has an admin role (role_id = 1)
            boolean isAdmin = user.getRoleId() == 1;
            return ResponseEntity.ok(isAdmin);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
    
    @GetMapping("/user-id")
    public ResponseEntity<Integer> getUserIdByUsername(@RequestParam String username) {
    	try {
	        Integer userId = userRepository.getUserIdByUsername(username);
	        return ResponseEntity.ok(userId);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    @GetMapping("/get-current-user-teams")
    public ResponseEntity<List<UserWithTeamDTO>> getUserTeams(@RequestParam("userId") Integer userId) {
    	try {
	        List<UserWithTeamDTO> teams = userTeamRepository.findUserTeamsByUserId(userId);
	        return new ResponseEntity<>(teams, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/get-users-with-roles")
    public ResponseEntity<List<UserWithRoleDTO>> getUsersWithRoles() {
    	try {
	        List<UserWithRoleDTO> usersWithRolesTeams = userRepository.findUsersWithRoles();
	        return new ResponseEntity<>(usersWithRolesTeams, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/get-user-teams")
    public ResponseEntity<List<UserWithTeamDTO>> getUserTeams() {
    	try {
	        List<UserWithTeamDTO> teams = userTeamRepository.findUsersWithTeams();
	        return new ResponseEntity<>(teams, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/get-roles")
    public ResponseEntity<List<Role>> getRoles() {
    	try {
	        List<Role> roles = roleRepository.findAll();
	        return new ResponseEntity<>(roles, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/get-teams")
    public ResponseEntity<List<Team>> getTeams() {
    	try {
	        List<Team> teams = teamRepository.findAll();
	        return new ResponseEntity<>(teams, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/change-user-role/{userId}")
    public ResponseEntity<HttpStatus> changeUserRole(@PathVariable int userId, @RequestBody RoleChangeDTO roleChangeDTO) {
        try {
            Optional<UserAccount> userData = userRepository.findById(userId);
            List<Role> roles = roleRepository.findAll();

            if (userData.isPresent()) {
                UserAccount user = userData.get();
                int oldRole = user.getRoleId();
                user.setRoleId(roleChangeDTO.getNewRoleId());
                
                // Log the audit information
                LocalDateTime currentLocalDateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
                String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

                AuditTrail audit = new AuditTrail();
                audit.setUserId(currentUserId);
                audit.setEntityChanged(user.getUsername());
                audit.setAttributeChanged("Changed User Role");
                audit.setChangeFrom(roleRepository.findById(oldRole).map(Role::getRoleName).orElse(null));
                audit.setChangeTo(roleRepository.findById(roleChangeDTO.getNewRoleId()).map(Role::getRoleName).orElse(null));
                audit.setDateTimeEdited(dateTimeEdited);
                userRepository.save(user);
                
                
                if (String.valueOf(oldRole) != String.valueOf(roleChangeDTO.getNewRoleId())) {
                	auditTrailRepository.save(audit);
                }
                
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Transactional
    @PostMapping("/change-user-team")
    public ResponseEntity<HttpStatus> changeUserTeam(@RequestBody TeamChangeDTO teamChangeDTO) {
        try {          
        	
        	// Fetch existing UserTeam entries for the given userId
        	List<UserTeam> oldTeams = userTeamRepository.findByUserId(teamChangeDTO.getUserId());
        	Optional<UserAccount> userData = userRepository.findById(teamChangeDTO.getUserId());
        	UserAccount user = userData.get();

        	// Extract IDs from existing UserTeam entries and store them in a list
        	List<Integer> oldTeamIds = new ArrayList<>();
        	for (UserTeam userTeam : oldTeams) {
        	    oldTeamIds.add(userTeam.getTeamId());
        	}

            // Delete existing UserTeam entries for the given userId
            userTeamRepository.deleteByUserId(teamChangeDTO.getUserId());
            List<Integer> newTeams = new ArrayList<>();

             	// Add the teams for the user
                for (Integer team : teamChangeDTO.getTeamId()) {
                    UserTeam userTeam = new UserTeam();
                    userTeam.setUserId(teamChangeDTO.getUserId());
                    userTeam.setTeamId(team);
                    userTeamRepository.save(userTeam);
                    newTeams.add(team);
                }
                
                // Log the audit information
                LocalDateTime currentLocalDateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
                String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

                AuditTrail audit = new AuditTrail();
                audit.setUserId(currentUserId);
                audit.setEntityChanged(user.getUsername());
                audit.setAttributeChanged("Changed User Team");
                audit.setChangeFrom(String.valueOf(oldTeams));
                audit.setChangeTo(String.valueOf(newTeams));
                audit.setDateTimeEdited(dateTimeEdited);
                if (String.valueOf(oldTeams) != String.valueOf(newTeams)) {
                	auditTrailRepository.save(audit);
                }

                return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // Handle any exceptions that occur during processing
        	System.out.println("An error occurred while updating teams: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PostMapping("/add-user-with-role-team")
    public ResponseEntity<UserAccount> addUserWithRoleAndTeam(@RequestBody UserWithRoleTeamDTO userRoleTeamDTO) {
        try {
            System.out.println("Received request to add user with role and team");

            UserAccount newUser = new UserAccount();
            System.out.println(userRoleTeamDTO.getUsername());
            System.out.println(userRoleTeamDTO.getRoleId());
            System.out.println(userRoleTeamDTO.getTeamId());
            
            // Get the current time
            LocalDateTime currentLocalDateTime = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
            String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

            // Save the new user to the database
            newUser.setDateCreated(dateTimeEdited);
            newUser.setUsername(userRoleTeamDTO.getUsername());
            newUser.setRoleId(userRoleTeamDTO.getRoleId());
            UserAccount newUserAccount = userRepository.save(newUser);
            System.out.println("New user saved to the database: " + newUserAccount.toString());

            // Add the teams for the user
            for (Integer team : userRoleTeamDTO.getTeamId()) {
                UserTeam userTeam = new UserTeam();
                userTeam.setUserId(newUserAccount.getUserId());
                userTeam.setTeamId(team);
                userTeamRepository.save(userTeam);
                System.out.println("Added team " + team + " for user " + newUserAccount.getUserId());
            }
            
            // Log the audit information
            AuditTrail audit = new AuditTrail();
            audit.setUserId(currentUserId);
            audit.setEntityChanged(null);
            audit.setAttributeChanged("Create User");
            audit.setChangeFrom(null);
            audit.setChangeTo(userRoleTeamDTO.getUsername());
            audit.setDateTimeEdited(dateTimeEdited);
            if (null != userRoleTeamDTO.getUsername()) {
            	auditTrailRepository.save(audit);
            }

            System.out.println("User with role and team successfully added");
            return new ResponseEntity<>(newUserAccount, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("An error occurred while adding user with role and team: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for detailed error information
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/get-teams-with-username")
    public ResponseEntity<List<TeamWithUsernameDTO>> getTeamsWithUsername() {
    	try {
	        List<TeamWithUsernameDTO> teams = teamRepository.findTeamsWithUsername();
	        return new ResponseEntity<>(teams, HttpStatus.OK);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Create a new team
    @PostMapping("/create-new-team")
    public ResponseEntity<Team> createTeam(@RequestBody TeamWithUsernameDTO teamWithUsernameDTO) {
        try {

            Team newTeam = new Team();
            
            // Get the current time
            LocalDateTime currentLocalDateTime = LocalDateTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
            String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

            // Save the new team to the database
            newTeam.setDateCreated(dateTimeEdited);
            newTeam.setTeamName(teamWithUsernameDTO.getTeamName());
            newTeam.setUserId(teamWithUsernameDTO.getUserId());
            Team newTeamData = teamRepository.save(newTeam);
            
            // Log the audit information
            AuditTrail audit = new AuditTrail();
            audit.setUserId(currentUserId);
            audit.setEntityChanged(null);
            audit.setAttributeChanged("Create Team");
            audit.setChangeFrom(null);
            audit.setChangeTo(String.valueOf(teamWithUsernameDTO.getTeamName()));
            audit.setDateTimeEdited(dateTimeEdited);
            if (null != String.valueOf(teamWithUsernameDTO.getTeamName())) {
            	auditTrailRepository.save(audit);
            }
            
           
            return new ResponseEntity<>(newTeamData, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("An error occurred while adding team: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for detailed error information
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // Delete a team
    @PostMapping("/delete-team/{teamId}")
    public ResponseEntity<HttpStatus> deleteTeam(@PathVariable int teamId) {
        try {

            // Check if the team exists
            Optional<Team> optionalTeam = teamRepository.findById(teamId);
            if (optionalTeam.isPresent()) {
                Team teamToDelete = optionalTeam.get();

                // Delete the team from the database
                teamRepository.delete(teamToDelete);

                // Log the audit information
                LocalDateTime currentLocalDateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
                String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

                AuditTrail audit = new AuditTrail();
                audit.setUserId(currentUserId);
                audit.setEntityChanged(String.valueOf(teamToDelete.getTeamName()));
                audit.setAttributeChanged("Delete Team");
                audit.setChangeFrom(String.valueOf(teamToDelete.getTeamName()));
                audit.setChangeTo(null);
                audit.setDateTimeEdited(dateTimeEdited);
                if (null != String.valueOf(teamToDelete.getTeamName())) {
                	auditTrailRepository.save(audit);
                }
                
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println("An error occurred while deleting team: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for detailed error information
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
	// Change the team name
    @PostMapping("/change-team-name/{teamId}")
    public ResponseEntity<HttpStatus> changeTeamName(@PathVariable int teamId, @RequestBody String newTeamName) {
        try {

            // Get the team from the database by its ID
            Optional<Team> optionalTeam = teamRepository.findById(teamId);
            if (optionalTeam.isPresent()) {
                Team team = optionalTeam.get();
                
                AuditTrail audit = new AuditTrail();
                audit.setEntityChanged(team.getTeamName());
                String oldTeamName = team.getTeamName();
                audit.setChangeFrom(oldTeamName);
                
                // Update the team's name
                team.setTeamName(newTeamName);
                
                // Save the updated team to the database
                Team updatedTeam = teamRepository.save(team);
                
                // Log the audit information
                LocalDateTime currentLocalDateTime = LocalDateTime.now();
                DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
                String dateTimeEdited = currentLocalDateTime.format(dateTimeFormatter);

                
                audit.setUserId(currentUserId);
                audit.setAttributeChanged("Change Team Name");
                audit.setChangeTo(newTeamName);
                audit.setDateTimeEdited(dateTimeEdited);
                if (oldTeamName != newTeamName) {
                	auditTrailRepository.save(audit);
                }
                
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.out.println("An error occurred while changing team name: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/unique-sites")
    public ResponseEntity<List<String>> getUniqueSites() {
        try {
            List<String> uniqueSites = dataEntryRepository.findDistinctSiteIds();
            return new ResponseEntity<>(uniqueSites, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/update-sites")
    @Transactional
    public ResponseEntity<String> updateSites(@RequestBody List<String> siteIds) {
        try {
            // Remove all current active sites
            currentSitesRepository.deleteAll();

            // Add new list of active sites
            for (String siteId : siteIds) {
                CurrentSites currentSite = new CurrentSites();
                currentSite.setSiteId(siteId);
                currentSitesRepository.save(currentSite);
            }

            return new ResponseEntity<>("Active sites updated successfully", HttpStatus.OK);
        } catch (Exception ex) {
            // Rollback in case of exceptions
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return new ResponseEntity<>("Failed to update active sites", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Retrieve audit data
    @GetMapping("/get-audit-trail-data")
    public ResponseEntity<List<AuditTrailDTO>> getAllAuditTrails() {
    	try {
	        List<AuditTrailDTO> auditTrails = auditTrailRepository.findAllAuditTrails();
	        return ResponseEntity.ok(auditTrails);
    	} catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

