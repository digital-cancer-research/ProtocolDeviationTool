package org.digitalecmt.qualityassurance.dto.Visualisation;

import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class DvcatDvdecodDTO {
    String dvcat;
    String dvdecod;
    Long[] count;
    String colour;

    public DvcatDvdecodDTO() {
    }

    public DvcatDvdecodDTO(String dvcat, String dvdecod, Long[] count, String colour) {
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

    public Long[] getCount() {
        return this.count;
    }

    public void setCount(Long[] count) {
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
        if (!(o instanceof DvcatDvdecodDTO)) {
            return false;
        }
        DvcatDvdecodDTO DvcatDvdecodDTO = (DvcatDvdecodDTO) o;
        return Objects.equals(dvcat, DvcatDvdecodDTO.dvcat)
                && Objects.equals(dvdecod, DvcatDvdecodDTO.dvdecod)
                && Objects.equals(count, DvcatDvdecodDTO.count)
                && Objects.equals(colour, DvcatDvdecodDTO.colour);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dvcat, dvdecod, count, colour);
    }

    @Override
    public String toString() {
        return "{" +
                " dvcat='" + getDvcat() + "'" +
                ", dvdecod='" + getDvdecod() + "'" +
                ", count='" + getCount() + "'" +
                ", colour='" + getColour() + "'" +
                "}";
    }

    @JsonIgnore
    public Long getTotalCount() {
        for (Long num : count) {
            if (num != 0) {
                return num;
            }
        }
        return 0L;
    }
}