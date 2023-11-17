package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "file_data")
public class FileData {
    @Id
    @Column(name = "file_data_id")
    @SequenceGenerator(initialValue=1, name="file_data_seq", sequenceName="file_data_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="file_data_seq")
    private int fileDataId;

    @Column(name = "file_id")
    private int fileId;

    @Column(name = "entry_id")
    private int entryId;

    // Getters and Setters

    public int getFileDataId() {
        return fileDataId;
    }

    public void setFileDataId(int fileDataId) {
        this.fileDataId = fileDataId;
    }

    public int getFileId() {
        return fileId;
    }

    public void setFileId(int fileId) {
        this.fileId = fileId;
    }

    public int getEntryId() {
        return entryId;
    }

    public void setEntryId(int entryId) {
        this.entryId = entryId;
    }
}