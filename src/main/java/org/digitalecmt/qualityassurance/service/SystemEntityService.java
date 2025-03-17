package org.digitalecmt.qualityassurance.service;

import org.digitalecmt.qualityassurance.models.entities.Team;
import org.digitalecmt.qualityassurance.models.entities.User;
import org.digitalecmt.qualityassurance.models.entities.UserTeam;
import org.digitalecmt.qualityassurance.models.entities.UserTeamId;
import org.digitalecmt.qualityassurance.models.pojo.Role;
import org.digitalecmt.qualityassurance.repository.TeamRepository;
import org.digitalecmt.qualityassurance.repository.UserRepository;
import org.digitalecmt.qualityassurance.repository.UserTeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SystemEntityService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserTeamRepository userTeamRepository;

    public final String localUserName = "localuser";

    public final String systemName = "System";

    public final String allDataTeamName = "All Data";

    @Transactional
    public User getLocalUser() {
        User user = userRepository.findByUsername(localUserName).orElseGet(() -> {
            User localUser = User.builder()
                    .username(localUserName)
                    .isSite(true)
                    .isSponsor(true)
                    .role(Role.USER)
                    .build();
            return userRepository.save(localUser);
        });

        UserTeam ut = UserTeam.builder()
                .teamId(getAllDataTeam().getId())
                .userId(user.getId())
                .build();
        UserTeamId id = new UserTeamId();
        id.setTeamId(ut.getTeamId());
        id.setUserId(ut.getUserId());
        if (!userTeamRepository.findById(id).isPresent()) {
            userTeamRepository.save(ut);
        }

        return user;
    }

    public User getSystemUser() {
        return userRepository.findByUsername(systemName).orElseGet(() -> {
            User systemUser = User.builder()
                    .username(systemName)
                    .isSite(true)
                    .isSponsor(true)
                    .role(Role.ADMIN)
                    .build();
            return userRepository.save(systemUser);
        });
    }

    public Team getAllDataTeam() {
        return teamRepository.findByName(allDataTeamName).orElseGet(() -> {
            Team allDataTeam = Team.builder()
                    .name(allDataTeamName)
                    .createdBy(getSystemUser().getId())
                    .build();
            return teamRepository.save(allDataTeam);
        });
    }
}