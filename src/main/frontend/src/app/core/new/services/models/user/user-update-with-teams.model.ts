import { Role } from "./role.enum";

export interface UserUpdateWithTeams {
    id: number;
    username: string;
    role: Role,
    isSite: boolean;
    isSponsor: boolean;
    adminId: number;
    teamIds: number[];
}