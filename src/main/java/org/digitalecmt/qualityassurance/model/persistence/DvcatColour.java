package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dvcat_colour")
public class DvcatColour {

    public DvcatColour() {
    }

    public DvcatColour(String dvcat, String colour) {
        this.dvcat = dvcat;
        this.colour = colour;
    }

    @Id
    @Column(name = "dvcat")
    private String dvcat;

    @Column(name = "colour")
    private String colour;

    // Getters and Setters

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

}