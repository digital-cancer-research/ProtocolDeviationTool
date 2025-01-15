package org.digitalecmt.qualityassurance.models.dto.File;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data transfer object for deleting a file.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileDeleteDto {
    /**
     * The ID of the file to be deleted.
     */
    Long fileId;

    /**
     * The ID of the user requesting the deletion.
     */
    Long deletedBy;
}
