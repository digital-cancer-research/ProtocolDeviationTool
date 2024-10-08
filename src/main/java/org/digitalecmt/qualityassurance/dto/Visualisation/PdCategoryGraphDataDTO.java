package org.digitalecmt.qualityassurance.dto.Visualisation;

import java.util.Objects;

import com.nimbusds.jose.shaded.gson.Gson;

public class PdCategoryGraphDataDTO {
    String dvcat;
    String colour;
    Long count;

    public PdCategoryGraphDataDTO() {
    }

    public PdCategoryGraphDataDTO(String dvcat, String colour, Long count) {
        this.dvcat = dvcat;
        this.colour = colour;
        this.count = count;
    }

    public String getDvcat() {
        return this.dvcat;
    }

    public void setDvcat(String category) {
        this.dvcat = category;
    }

    public String getColour() {
        return this.colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public PdCategoryGraphDataDTO category(String category) {
        setDvcat(category);
        return this;
    }

    public PdCategoryGraphDataDTO colour(String colour) {
        setColour(colour);
        return this;
    }

    public PdCategoryGraphDataDTO count(Long count) {
        setCount(count);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof PdCategoryGraphDataDTO)) {
            return false;
        }
        PdCategoryGraphDataDTO categoryDTO = (PdCategoryGraphDataDTO) o;
        return Objects.equals(dvcat, categoryDTO.dvcat) && Objects.equals(colour, categoryDTO.colour)
                && count == categoryDTO.count;
    }

    @Override
    public int hashCode() {
        return Objects.hash(dvcat, colour, count);
    }

    @Override
    public String toString() {
        Gson gson = new Gson();
        return gson.toJson(this, PdCategoryGraphDataDTO.class);
    }
}