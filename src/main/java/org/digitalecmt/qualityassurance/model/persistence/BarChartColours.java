package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Objects;


import com.nimbusds.jose.shaded.gson.Gson;

@Entity
public class BarChartColours {

    @Id
    @Column(name = "colour")
    private String colour;

    public BarChartColours() {
    }

    public BarChartColours(String colour) {
        this.colour = colour;
    }

    public String getColour() {
        return this.colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof BarChartColours)) {
            return false;
        }
        BarChartColours barChartColours = (BarChartColours) o;
        return Objects.equals(colour, barChartColours.colour);
    }

    @Override
    public String toString() {
        Gson gson = new Gson();
        return gson.toJson(this, BarChartColours.class);
    }

}
