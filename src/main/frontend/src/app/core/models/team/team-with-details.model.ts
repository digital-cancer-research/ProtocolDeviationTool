import { Team } from "../../new/services/models/team/team.model";

/**
 * @interface
 * Represents a team in the application with additional details about the team:
 * username of the user who created the team
 */
export interface TeamWithDetails extends Team {
    username: string;
}