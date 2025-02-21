import { Role } from "./role.enum";

export interface UserCreateWithTeams {
    username: string;
    role: Role,
    isSite: boolean;
    isSponsor: boolean;
    adminId: number;
    teamIds: number[];
}