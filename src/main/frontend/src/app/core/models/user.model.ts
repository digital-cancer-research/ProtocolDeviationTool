import { Team } from "./team.model";

/**
 * @interface
 * Represents a user in the application
 */
export interface User {
  userId: number;
  username: string;
  roleId: number;
  isSite: boolean;
  isSponsor: boolean;
  teams: Team[];
  selectedTeam: Team | null;
}