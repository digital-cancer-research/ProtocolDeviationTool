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
 * Entity representing a file in the system.
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class File {

    /**
     * The unique identifier for the file.
     */
    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The name of the file.
     * Must not be null and must be between 1 and 255 characters.
     */
    @Column(name = "file_name")
    @Size(min = 1, max = 255)
    @NotNull
    private String fileName;

    /**
     * The ID of the {@link User} who uploaded the file.
     */
    @Column(name = "uploaded_by")
    private Long uploadedBy;

    /**
     * The date and time when the file was uploaded.
     */
    @Column(name = "date_uploaded")
    private LocalDateTime dateUploaded;

    @PrePersist
    public void prePersist() {
        this.dateUploaded = LocalDateTime.now();
    }
}