package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.pojo.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing a user in the system.
 */
@Entity
@Table(name = "\"user\"")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    /**
     * The username of the user.
     * Must be unique and not null.
     * The minimum length is 1 character.
     * The maximum length is 255 characters.
     */
    @NotNull
    @Size(min = 1, max = 255)
    private String username;

    /**
     * The role of the user.
     * This field is an enumeration.
     */
    @Enumerated(EnumType.STRING)
    private Role role;

    /**
     * Indicates if the user is a site.
     */
    @Column(name = "is_site")
    private Boolean isSite;

    /**
     * Indicates if the user is a sponsor.
     */
    @Column(name = "is_sponsor")
    private Boolean isSponsor;

    /**
     * The date and time when the user was created.
     * This field is automatically populated by the database if not provided.
     */
    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @PrePersist
    public void prePersist() {
        this.dateCreated = LocalDateTime.now();
    }
}
