package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.exception.UserNotAuthorisedException;
import org.digitalecmt.qualityassurance.exception.UserNotFoundException;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.digitalecmt.qualityassurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorisationService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Checks if a user is an admin and throws an exception if not.
     *
     * @param id the ID of the user to check
     * @throws UserNotAuthorisedException if the user is not an admin
     */
    public void checkIfUserIsAdmin(Long id) {
        if (!isUserAdmin(id)) {
            throw new UserNotAuthorisedException(id);
        }
    }

    /**
     * Checks if a user is an admin.
     *
     * @param id the ID of the user to check
     * @return true if the user is an admin, false otherwise
     */
    public Boolean isUserAdmin(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
        return user.getRole().equals(Role.ADMIN);
    }
}
