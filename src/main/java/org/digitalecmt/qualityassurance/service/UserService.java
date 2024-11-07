package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.exceptions.UserNotFoundException;
import org.digitalecmt.qualityassurance.model.persistence.UserAccount;
import org.digitalecmt.qualityassurance.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserAccountRepository userAccountRepository;

    public UserAccount findUserById(Integer id) {
        UserAccount user = userAccountRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return user;
    };

    public UserAccount updateUser(Integer id, UserAccount user) {
        UserAccount currentUser = userAccountRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));

        currentUser.setUsername(user.getUsername());
        currentUser.setRoleId(user.getRoleId());
        currentUser.setIsSite(user.getIsSite());
        currentUser.setIsSponsor(user.getIsSponsor());
        return userAccountRepository.save(currentUser);
    }
}
