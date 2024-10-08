package org.digitalecmt.qualityassurance.dto.Visualisation;

import java.util.Objects;

import com.nimbusds.jose.shaded.gson.Gson;

public class DvcatDvdecodRepositoryDataDTO {
    String dvcat;
    String dvdecod;
    Long count;
    String colour;

    public DvcatDvdecodRepositoryDataDTO() {
    }

    public DvcatDvdecodRepositoryDataDTO(String dvcat, String dvdecod, Long count, String colour) {
        this.dvcat = dvcat;
        this.dvdecod = dvdecod;
        this.count = count;
        this.colour = colour;
    }

    public String getDvcat() {
        return this.dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }

    public String getDvdecod() {
        return this.dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count;
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
        if (!(o instanceof DvcatDvdecodRepositoryDataDTO)) {
            return false;
        }
        DvcatDvdecodRepositoryDataDTO dvcatDvdecodRepositoryDataDTO = (DvcatDvdecodRepositoryDataDTO) o;
        return Objects.equals(dvcat, dvcatDvdecodRepositoryDataDTO.dvcat)
                && Objects.equals(dvdecod, dvcatDvdecodRepositoryDataDTO.dvdecod)
                && Objects.equals(count, dvcatDvdecodRepositoryDataDTO.count)
                && Objects.equals(colour, dvcatDvdecodRepositoryDataDTO.colour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dvcat, dvdecod, count, colour);
    }

    @Override
    public String toString() {
        Gson gson = new Gson();
        return gson.toJson(this, DvcatDvdecodRepositoryDataDTO.class);
    }
}
