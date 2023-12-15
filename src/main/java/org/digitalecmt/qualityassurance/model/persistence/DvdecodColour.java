package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dvdecod_colour")
public class DvdecodColour {
	
	@Id
    @Column(name = "dvdecod")
    private String dvdecod;

    @Column(name = "colour")
    private String colour;

    // Getters and Setters

    public String getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

}