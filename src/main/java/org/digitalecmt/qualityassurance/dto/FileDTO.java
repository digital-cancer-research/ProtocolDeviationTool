package org.digitalecmt.qualityassurance.dto;


public class FileDTO {
    private int fileId;
    private String fileName;
    private String username;
    private String dateTimeUploaded;

    // No-argument constructor
    public FileDTO() {
    }

    // Constructor with parameters
    public FileDTO(int fileId, String fileName, String username, String dateTimeUploaded) {
        this.fileId = fileId;
        this.fileName = fileName;
        this.username = username;
        this.dateTimeUploaded = dateTimeUploaded;
    }

    // Getters and setters

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

    public String getDateTimeUploaded() {
        return dateTimeUploaded;
    }

    public void setDateTimeUploaded(String dateTimeUploaded) {
        this.dateTimeUploaded = dateTimeUploaded;
    }
}
