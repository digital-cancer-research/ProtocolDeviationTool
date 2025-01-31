package org.digitalecmt.qualityassurance.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "data_sub_category")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(DataSubCategory.class)
public class DataSubCategory {
    
    @Id
    @Column(name = "data_category_id")
    @NotNull
    private Long dataCategoryId;
    
    @Id
    @Column(name = "dvdecod_id")
    @NotNull
    private Long dvdecodId;
    
}
