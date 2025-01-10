package org.digitalecmt.qualityassurance.models.entities;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserTeamId implements Serializable {
    private long userId;
    private long teamId;    
}
