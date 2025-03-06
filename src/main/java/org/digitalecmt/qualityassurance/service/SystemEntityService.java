package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemEntityService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserRepository userRepository;

    public User getSystemUser() {
        return userRepository.findByUsername("SYSTEM").orElseGet(() -> {
            User systemUser = User.builder()
                    .username("SYSTEM")
                    .isSite(true)
                    .isSponsor(true)
                    .role(Role.ADMIN)
                    .build();
            return userRepository.save(systemUser);
        });
    }

    public Team getAllDataTeam() {
        return teamRepository.findByName("ALL DATA").orElseGet(() -> {
            Team allDataTeam = Team.builder()
                    .name("ALL DATA")
                    .createdBy(getSystemUser().getId())
                    .build();
            return teamRepository.save(allDataTeam);
        });
    }
}
