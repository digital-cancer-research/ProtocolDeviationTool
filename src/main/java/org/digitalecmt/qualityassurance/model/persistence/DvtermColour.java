package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dvterm_colour")
public class DvtermColour {
	
	@Id
    @Column(name = "dvterm")
    private String dvterm;

    @Column(name = "colour")
    private String colour;

    // Getters and Setters

    public String getDvterm() {
        return dvterm;
    }

    public void setDvterm(String dvterm) {
        this.dvterm = dvterm;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

}