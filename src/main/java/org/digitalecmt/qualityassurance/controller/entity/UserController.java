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

import org.digitalecmt.qualityassurance.dto.RoleChangeDTO;
import org.digitalecmt.qualityassurance.dto.TeamChangeDTO;
import org.digitalecmt.qualityassurance.dto.UserTeamDTO;
import org.digitalecmt.qualityassurance.dto.UserWithRoleDTO;
import org.digitalecmt.qualityassurance.dto.UserWithTeamDTO;
import org.digitalecmt.qualityassurance.model.persistence.UserAccount;
import org.digitalecmt.qualityassurance.model.persistence.UserTeam;
import org.digitalecmt.qualityassurance.model.persistence.Role;
import org.digitalecmt.qualityassurance.model.persistence.Team;
import org.digitalecmt.qualityassurance.repository.RoleRepository;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.UserAccountRepository;
import org.digitalecmt.qualityassurance.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private Logger log = Logger.getLogger(UserController.class.getName());
	
    @Autowired
    private UserAccountRepository userRepository;
    
    @Autowired
    private TeamRepository teamRepository;
    
    @Autowired
    private UserTeamRepository userTeamRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
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
        List<UserAccount> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
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
            // User not found or other error handling
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
    
    @GetMapping("/get-users-with-roles")
    public ResponseEntity<List<UserWithRoleDTO>> getUsersWithRoles() {
        List<UserWithRoleDTO> usersWithRolesTeams = userRepository.findUsersWithRoles();
        return new ResponseEntity<>(usersWithRolesTeams, HttpStatus.OK);
    }
    
    @GetMapping("/get-user-teams")
    public ResponseEntity<List<UserWithTeamDTO>> getUserTeams() {
        List<UserWithTeamDTO> teams = userTeamRepository.findUsersWithTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
    
    @GetMapping("/get-roles")
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> roles = roleRepository.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
    
    @GetMapping("/get-teams")
    public ResponseEntity<List<Team>> getTeams() {
        List<Team> teams = teamRepository.findAll();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
    
    @PostMapping("/change-user-role/{userId}")
    public ResponseEntity<HttpStatus> changeUserRole(@PathVariable int userId, @RequestBody RoleChangeDTO roleChangeDTO) {
        try {
            Optional<UserAccount> userData = userRepository.findById(userId);

            if (userData.isPresent()) {
                UserAccount user = userData.get();
                user.setRoleId(roleChangeDTO.getNewRoleId());
                userRepository.save(user);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/change-user-team/{userId}")
    public ResponseEntity<HttpStatus> changeUserTeam(@PathVariable int userId, @RequestBody TeamChangeDTO teamChangeDTO) {
        try {
            Optional<UserAccount> userData = userRepository.findById(userId);

            if (userData.isPresent()) {
                UserAccount user = userData.get();

                // Clear existing teams for the user
                userTeamRepository.deleteByUserId(userId);

                // Add the new teams for the user
                List<Integer> newTeamIds = teamChangeDTO.getNewTeamIds();
                for (Integer teamId : newTeamIds) {
                    Optional<Team> teamData = teamRepository.findById(teamId);
                    if (teamData.isPresent()) {
                        Team team = teamData.get();
                        UserTeam userTeam = new UserTeam();
                        userTeam.setUserId(user.getUserId());
                        userTeam.setTeamId(team.getTeamId());
                        userTeamRepository.save(userTeam);
                    } else {
                        // Handle case where team with given ID is not found
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                }

                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                // Handle case where user with given ID is not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Handle any exceptions that occur during processing
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @PostMapping("/add-user-with-role-team")
    public ResponseEntity<UserAccount> addUserWithRoleAndTeam(@RequestBody UserTeamDTO userTeamDTO) {
        try {
            System.out.println("Received request to add user with role and team");

            UserAccount newUser = userTeamDTO.getUser();
            System.out.println(newUser);
            List<Team> selectedTeams = userTeamDTO.getTeams();
            System.out.println(selectedTeams);

            // Save the new user to the database
            UserAccount newUserAccount = userRepository.save(newUser);
            System.out.println("New user saved to the database: " + newUserAccount.toString());

            // Add the teams for the user
            for (Team team : selectedTeams) {
                UserTeam userTeam = new UserTeam();
                userTeam.setUserId(newUserAccount.getUserId());
                userTeam.setTeamId(team.getTeamId());
                userTeamRepository.save(userTeam);
                System.out.println("Added team " + team.getTeamId() + " for user " + newUserAccount.getUserId());
            }

            System.out.println("User with role and team successfully added");
            return new ResponseEntity<>(newUserAccount, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println("An error occurred while adding user with role and team: " + e.getMessage());
            e.printStackTrace(); // Print stack trace for detailed error information
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

