package org.digitalecmt.qualityassurance.models.pojo;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents the response from the AI prediction service.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AiResponse {
    private String dvspondes;
    private List<Category> categories;
    private String timestamp;

    @Override
    public String toString() {
        return "DVCAT = " + categories.stream().map(Category::getDvcat).toList() + '\n' +
                "DVDECOD = " + categories.stream().map(Category::getDvdecod).toList();
    }
}
