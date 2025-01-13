package org.digitalecmt.qualityassurance.models.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for deleting a user.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDeleteDto {

    /**
     * The ID of the user to be deleted.
     */
    private Long userId;

    /**
     * The ID of the admin performing the deletion.
     */
    private Long adminId;
}
