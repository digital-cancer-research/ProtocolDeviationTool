package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a team entity.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Team {

    /**
     * The unique identifier for the team.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id")
    private Long id;

    /**
     * The name of the team.
     * Must be unique and not null.
     * The minimum length is 1 character.
     * The maximum length is 255 characters.
     */
    @Column(name = "team_name")
    @NotNull
    @Size(min = 1, max = 255)
    private String name;

    /**
     * The ID of the {@link User} who created the team.
     */
    @Column(name = "created_by")
    private Long createdBy;

    /**
     * The date and time when the team was created.
     * This field is automatically populated by the database if not provided.
     */
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @PrePersist
    public void prePersist() {
        this.dateCreated = LocalDateTime.now();
    }
}
