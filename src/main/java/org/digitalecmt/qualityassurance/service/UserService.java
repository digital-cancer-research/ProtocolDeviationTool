package org.digitalecmt.qualityassurance.service;

import java.util.ArrayList;
import java.util.List;

import org.digitalecmt.qualityassurance.exception.UserNotAuthorisedException;
import org.digitalecmt.qualityassurance.exception.UserNotFoundException;
import org.digitalecmt.qualityassurance.models.dto.User.UserCreateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserWithTeamsDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.digitalecmt.qualityassurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing users.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminAuditService adminAuditService;

    @Autowired
    private AuthorisationService authService;

    public User getAiUser() {
        return userRepository.findByUsername("AI MODEL")
        .orElseGet(() -> {
            User user = User.builder()
            .username("AI MODEL")
            .role(Role.USER)
            .isSite(false)
            .isSponsor(false)
            .build();
            return userRepository.save(user);
        });
    }

    /**
     * Verifies if a user exists by their ID.
     *
     * @param id the ID of the user to verify
     */
    public void verifyUserId(Long id) {
        findUserById(id);
    }

    /**
     * Finds a user by their ID.
     *
     * @param id the ID of the user to find
     * @return the found user
     * @throws UserNotFoundException if the user is not found
     */
    public User findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return user;
    }

    /**
     * Finds a user by their username.
     *
     * @param username the username of the user to find
     * @return the found user
     * @throws UserNotFoundException if the user is not found
     */
    public User findUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User with username " + username + " not found"));
        return user;
    }

    /**
     * Creates a new user.
     *
     * @param userDto the data transfer object containing the user details
     * @return the created user
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    public User createUser(UserCreateDto userDto) {
        Long adminId = userDto.getAdminId();
        authService.checkIfUserIsAdmin(adminId);

        User user = userDto.toUser();
        user = userRepository.save(user);

        adminAuditService.auditCreateUser(user, adminId);
        return user;
    }

    /**
     * Updates an existing user.
     *
     * @param userDto the data transfer object containing the updated user details
     * @return the updated user
     * @throws UserNotFoundException      if the user is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    public User updateUser(UserUpdateDto userDto) {
        Long adminId = userDto.getAdminId();
        authService.checkIfUserIsAdmin(adminId);
        
        Long userId = userDto.getId();
        User oldUser = findUserById(userId);
        String oldUserDetails = oldUser.toString();

        User user = userDto.toUser();
        user.setDateCreated(oldUser.getDateCreated());

        if (user.toString().equals(oldUserDetails)) {
            return user;
        }

        userRepository.save(user);

        adminAuditService.auditUpdateUser(user, oldUserDetails, adminId);
        return user;
    }

    /**
     * Deletes a user by their ID.
     *
     * @param userDto the data transfer object containing the user ID and admin ID
     * @throws UserNotFoundException      if the user is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    public void deleteUserById(UserDeleteDto userDto) {
        Long adminId = userDto.getAdminId();
        authService.checkIfUserIsAdmin(adminId);
        
        Long userId = userDto.getId();
        User user = findUserById(userId);

        userRepository.delete(user);
        adminAuditService.auditDeleteUser(user, adminId);
    }

    /**
     * Retrieves all users.
     *
     * @return a list of all users
     */
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public List<UserWithTeamsDto> getUsersWithTeams() {
        List<User> users = getUsers();
        List<UserWithTeamsDto> userWithTeams = new ArrayList<>();
        users.forEach(user -> {
            List<Team> teams = getUserTeams(user.getId());
            userWithTeams.add(new UserWithTeamsDto(user, teams));
        });
        return userWithTeams;
    }

    /**
     * Retrieves the list of teams associated with a user.
     *
     * @param id the ID of the user
     * @return a list of teams associated with the user
     * @throws UserNotFoundException if the user is not found
     */
    public List<Team> getUserTeams(Long id) {
        findUserById(id);
        return userRepository.findUserTeamsByUserId(id);
    }
}
