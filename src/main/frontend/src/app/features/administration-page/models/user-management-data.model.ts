import { Team } from "src/app/core/new/services/models/team/team.model";

export interface UserManagementData {
  userId: number
  username: string;
  dateCreated: string
  roleId: number
  roleName: string;
  teams: Team[]
  isEdited: boolean;
  isLoading: boolean;
}