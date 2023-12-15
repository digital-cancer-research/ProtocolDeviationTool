package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usubjid_colour")
public class UsubjidColour {
	
	@Id
    @Column(name = "usubjid")
    private String usubjid;

    @Column(name = "colour")
    private String colour;

    // Getters and Setters

    public String getUsubjid() {
        return usubjid;
    }

    public void setUsubjid(String usubjid) {
        this.usubjid = usubjid;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

}