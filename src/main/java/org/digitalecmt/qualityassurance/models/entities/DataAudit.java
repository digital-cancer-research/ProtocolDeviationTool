package org.digitalecmt.qualityassurance.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "data_audit")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataAudit {
    
    @Id
    @Column(name = "audit_id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

	@Column(name = "user_id")
    private Long userId;

    @Column(name = "data_id")
    private Long dataId;
	
    @NotNull
    private String action;
	
	@Column(name = "original_value")
    @NotNull
    private String originalValue;
	
    @Column(name = "new_value")
    @NotNull
    private String newValue;
    
    @NotNull
    private LocalDateTime date;
}
