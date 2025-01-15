package org.digitalecmt.qualityassurance.service;

import java.util.List;

import org.digitalecmt.qualityassurance.exception.UserNotAuthorisedException;
import org.digitalecmt.qualityassurance.exception.UserNotFoundException;
import org.digitalecmt.qualityassurance.models.dto.User.UserCreateDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserDeleteDto;
import org.digitalecmt.qualityassurance.models.dto.User.UserUpdateDto;
import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
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
     * @throws UserNotFoundException if the user is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    public User updateUser(UserUpdateDto userDto) {
        Long adminId = userDto.getAdminId();
        Long userId = userDto.getUserId();

        authService.checkIfUserIsAdmin(adminId);
        
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        User user = userDto.toUser();
        userRepository.save(currentUser);

        adminAuditService.auditUpdateUser(user, adminId);
        return currentUser;
    }

    /**
     * Deletes a user by their ID.
     *
     * @param userDto the data transfer object containing the user ID and admin ID
     * @throws UserNotFoundException if the user is not found
     * @throws UserNotAuthorisedException if the admin is not authorised
     */
    public void deleteUserById(UserDeleteDto userDto) {
        Long adminId = userDto.getAdminId();
        Long userId = userDto.getUserId();

        authService.checkIfUserIsAdmin(adminId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

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
