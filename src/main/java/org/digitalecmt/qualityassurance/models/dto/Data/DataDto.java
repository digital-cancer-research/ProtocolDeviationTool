package org.digitalecmt.qualityassurance.models.dto.Data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object (DTO) representing protocol deviation data.
 * 
 * <p>
 * This class is used to transfer data between layers of the application,
 * specifically
 * representing information related to protocol deviations such as study ID,
 * deviation descriptor
 * and various deviation categories.
 * </p>
 * 
 * <p>
 * The class uses Lombok annotations to automatically generate boilerplate code
 * such
 * as getters, setters, constructors, and the `toString`, `equals`, and
 * `hashCode` methods.
 * </p>
 * 
 * <p>
 * Fields in this DTO include:
 * </p>
 * <ul>
 * <li><b>studyId</b> - the ID of the study associated with the data
 * (string).</li>
 * <li><b>dvspondes</b> - the deviation descriptor.</li>
 * <li><b>dvcat</b> - the deviation category..</li>
 * <li><b>dvdecod</b> - the deviation decoding.</li>
 * <li><b>dvterm</b> - the deviation term.</li>
 * </ul>
 * 
 * <p>
 * This class is annotated with:
 * </p>
 * <ul>
 * <li>{@link Data} - Generates all the boilerplate that is normally associated
 * with simple POJOs.</li>
 * <li>{@link NoArgsConstructor} - Generates a no-argument constructor.</li>
 * <li>{@link AllArgsConstructor} - Generates a constructor with arguments for
 * all fields.</li>
 * </ul>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DataDto {
    public Long entryId;
    public String siteId;
    public String studyId;
    public String dvspondes;
    public String dvcat;
    public String dvdecod;
    public String dvterm;
}
