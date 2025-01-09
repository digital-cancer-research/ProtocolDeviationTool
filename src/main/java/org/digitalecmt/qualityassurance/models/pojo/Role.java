package org.digitalecmt.qualityassurance.models.pojo;

/**
 * Enum representing different roles in the system.
 */
public enum Role {
    /**
     * Regular user role.
     */
    USER,

    /**
     * Administrator role with elevated privileges.
     */
    ADMIN,

    /**
     * Deactivated role, indicating the user is not active.
     */
    DEACTIVATED
}
