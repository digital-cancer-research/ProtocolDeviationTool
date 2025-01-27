package org.digitalecmt.qualityassurance.controller;

import org.digitalecmt.qualityassurance.models.dto.User.UserCreateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateWithTeamsDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserWithTeamsDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.service.AuthorisationService;
import org.digitalecmt.qualityassurance.service.UserService;
import org.digitalecmt.qualityassurance.service.UserTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthorisationService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserTeamService userTeamService;

    /**
     * Creates a new user.
     *
     * @param userDto the data transfer object containing the user details
     * @return a ResponseEntity containing the created user and HTTP status code
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserCreateDto userDto) {
        User user = userService.createUser(userDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    /**
     * Updates a user's information.
     *
     * @param user the data transfer object containing the updated user details
     * @return a ResponseEntity containing the updated user and HTTP status code
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@RequestBody UserUpdateDto user) {
        return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
    }

    /**
     * Deletes a user by their ID.
     *
     * @param user the data transfer object containing the user ID and admin ID
     * @return a ResponseEntity with HTTP status code
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@RequestBody UserDeleteDto user) {
        userService.deleteUserById(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Updates a user's information along with their team access.
     *
     * @param user the data transfer object containing the updated user details and team IDs
     * @return a ResponseEntity containing the updated user with their teams and HTTP status code
     */
    @PutMapping("/{id}/with-teams")
    public ResponseEntity<UserWithTeamsDto> updateUserWithTeams(@RequestBody UserUpdateWithTeamsDto user) {
        UserWithTeamsDto userWithTeams = userTeamService.updateUserWithTeamAccess(user);
        return new ResponseEntity<>(userWithTeams, HttpStatus.OK);
    }

    /**
     * Retrieves all users.
     *
     * @return a ResponseEntity containing a list of all users and HTTP status code
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username the username of the user to retrieve
     * @return a ResponseEntity containing the retrieved user and HTTP status code
     */
    @GetMapping(params = "username")
    public ResponseEntity<User> findUserByUsername(@RequestParam("username") String username) {
        User user = userService.findUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id the ID of the user to retrieve
     * @return a ResponseEntity containing the retrieved user and HTTP status code
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable(required = true) Long id) {
        return new ResponseEntity<>(userService.findUserById(id), HttpStatus.OK);
    }

    /**
     * Checks if a user is an admin.
     *
     * @param id the ID of the user to check
     * @return a ResponseEntity containing a boolean indicating if the user is an admin and HTTP status code
     */
    @GetMapping("/{id}/admin")
    public ResponseEntity<Boolean> isUserAdmin(@PathVariable Long id) {
        Boolean isUserAdmin = authService.isUserAdmin(id);
        return new ResponseEntity<>(isUserAdmin, HttpStatus.OK);
    }

    /**
     * Retrieves the list of teams associated with a user.
     *
     * @param id the ID of the user
     * @return a ResponseEntity containing a list of teams associated with the user and HTTP status code
     */
    @GetMapping("/{id}/teams")
    public ResponseEntity<List<Team>> getUserTeams(@PathVariable("id") Long id) {
        List<Team> teams = userService.getUserTeams(id);
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }
}
