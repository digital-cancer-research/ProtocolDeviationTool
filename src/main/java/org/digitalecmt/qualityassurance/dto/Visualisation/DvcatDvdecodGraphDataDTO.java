package org.digitalecmt.qualityassurance.dto.Visualisation;

import java.util.List;
import java.util.Objects;

public class DvcatDvdecodGraphDataDTO {
    List<String> dvcats;
    List<DvcatDvdecodDTO> data;

    public DvcatDvdecodGraphDataDTO() {
    }

    public DvcatDvdecodGraphDataDTO(List<String> dvcats, List<DvcatDvdecodDTO> data) {
        this.dvcats = dvcats;
        this.data = data;
    }

    public List<String> getDvcats() {
        return this.dvcats;
    }

    public void setDvcats(List<String> dvcats) {
        this.dvcats = dvcats;
    }

    public List<DvcatDvdecodDTO> getData() {
        return this.data;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof DvcatDvdecodGraphDataDTO)) {
            return false;
        }
        DvcatDvdecodGraphDataDTO dvcatDvdecodGraphDataDTO = (DvcatDvdecodGraphDataDTO) o;
        return Objects.equals(dvcats, dvcatDvdecodGraphDataDTO.dvcats)
                && Objects.equals(data, dvcatDvdecodGraphDataDTO.data);
    }

    @Override
    public int hashCode() {
        return Objects.hash(dvcats, data);
    }

    @Override
    public String toString() {
        return "{" +
                " dvcats='" + getDvcats() + "'" +
                ", data='" + getData() + "'" +
                "}";
    }
}