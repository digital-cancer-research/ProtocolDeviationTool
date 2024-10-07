package org.digitalecmt.qualityassurance.repository;

import org.digitalecmt.qualityassurance.model.persistence.BarChartColours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarChartColoursRepository extends JpaRepository<BarChartColours, String> {
}
