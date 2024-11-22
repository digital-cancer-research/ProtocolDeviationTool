/**
 * Represents a user team connection.
 * A 'user team' is a reference between a user and a team.
 * Example: If a user is in 5 teams, then they will have 5 user teams.
 * Conversely, if a team has 10 users, it will have 10 user teams.
 */
export interface UserTeam {
    userId: number;
    teamId: number;
    teamName: string;
}