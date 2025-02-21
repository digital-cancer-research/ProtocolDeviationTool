package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;

import org.digitalecmt.qualityassurance.models.pojo.FileStatus;

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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity class representing a file audit record.
 */
@Entity
@Data
@Builder
@Table(name = "file_audit")
@AllArgsConstructor
@NoArgsConstructor
public class FileAudit {

    /** The ID of the audit record. */
    @Id
    @Column(name = "audit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** The ID of the user who performed the action. */
    @Column(name = "user_id")
    @NotNull
    private Long userId;

    /** The name of the file. */
    @Column(name = "file_name")
    @NotNull
    private String fileName;

    /** The status of the file. */
    @Enumerated(EnumType.STRING)
    @Column(name = "file_status")
    @NotNull
    private FileStatus fileStatus;

    /** The date and time when the action was performed. */
    @NotNull
    private LocalDateTime date;

    @PrePersist
    public void prePersist() {
        if (date == null) {
            date = LocalDateTime.now();
        }
    }

}
