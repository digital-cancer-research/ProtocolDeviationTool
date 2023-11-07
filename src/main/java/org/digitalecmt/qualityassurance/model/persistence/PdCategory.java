package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pd_category")
public class PdCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "dvcat", nullable = false)
    private String dvcat;

    @Column(name = "dvdecod", nullable = false)
    private String dvdecod;

    @Column(name = "dvterm", nullable = false)
    private String dvterm;

    // Getters and setters

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getDvcat() {
        return dvcat;
    }

    public void setDvcat(String dvcat) {
        this.dvcat = dvcat;
    }

    public String getDvdecod() {
        return dvdecod;
    }

    public void setDvdecod(String dvdecod) {
        this.dvdecod = dvdecod;
    }

    public String getDvterm() {
        return dvterm;
    }

    public void setDvterm(String dvterm) {
        this.dvterm = dvterm;
    }
}
