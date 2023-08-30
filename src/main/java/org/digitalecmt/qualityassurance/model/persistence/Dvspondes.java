package org.digitalecmt.qualityassurance.model.persistence;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dvspondes")
public class Dvspondes {
    @Id
    @Column(name = "dvspondes_id")
    private int dvspondesId;

    @Column(name = "dvspondes_value", nullable = false)
    private String dvspondesValue;

    // Getters and setters

    public int getDvspondesId() {
        return dvspondesId;
    }

    public void setDvspondesId(int dvspondesId) {
        this.dvspondesId = dvspondesId;
    }

    public String getDvspondesValue() {
        return dvspondesValue;
    }

    public void setDvspondesValue(String dvspondesValue) {
        this.dvspondesValue = dvspondesValue;
    }
}
