package org.digitalecmt.qualityassurance.model.persistence;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "files")
public class Files {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id", columnDefinition = "serial")
    private int fileId;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "username")
    private String username;

    @Column(name = "date_time_uploaded")
    private LocalDateTime dateTimeUploaded;

    // Getters and Setters

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDateTime getDateTimeUploaded() {
        return dateTimeUploaded;
    }

    public void setDateTimeUploaded(LocalDateTime currentDateTime) {
        this.dateTimeUploaded = currentDateTime;
    }
}