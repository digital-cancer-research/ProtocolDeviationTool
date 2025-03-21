package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing an audit record for administrative actions.
 */
@Entity
@Table(name = "admin_audit")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminAudit {

    /**
     * The unique identifier for the audit record.
     */
    @Id
    @Column(name = "audit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The ID of the user who performed the action.
     */
    @Column(name = "user_id")
    private Long userId;

    /**
     * The entity the action was performed on.
     * Must not be null.
     */
    @NotNull
    private String entity;

    /**
     * The action performed.
     * Must not be null.
     */
    @NotNull
    private String action;

    /**
     * The original value before the change.
     * Must not be null.
     */
    @Column(name = "original_value")
    @NotNull
    private String originalValue;

    /**
     * The new value after the change.
     * Must not be null.
     */
    @Column(name = "new_value")
    @NotNull
    private String newValue;

    /**
     * The date and time when the action was performed.
     * Must not be null.
     */
    @NotNull
    private LocalDateTime date;

    @PrePersist
    public void prePersist() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }
}