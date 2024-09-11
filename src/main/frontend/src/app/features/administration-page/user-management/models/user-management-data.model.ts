import { Team } from "src/app/core/models/team.model";

export interface UserManagementData {
  userId: number
  username: string;
  dateCreated: string
  roleId: number
  roleName: string;
  teams: Team[]
  isEdited: boolean;
}