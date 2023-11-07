package org.digitalecmt.qualityassurance.dto;

public class PdCategoryDTO {
    private Integer categoryId;
    private String dvterm;
    private String dvdecod;
    private String dvcat;

 // No-argument constructor
    public PdCategoryDTO() {
    }

    // Constructor with parameters
    public PdCategoryDTO(Integer categoryId, String dvterm, String dvdecod, String dvcat) {
        this.categoryId = categoryId;
        this.dvterm = dvterm;
        this.dvdecod = dvdecod;
        this.dvcat = dvcat;
    }

    // Getters and setters
    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getDvterm() {
        return dvterm;
    }

    public void setDvterm(String dvterm) {
        this.dvterm = dvterm;
    }

    public String getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }
}