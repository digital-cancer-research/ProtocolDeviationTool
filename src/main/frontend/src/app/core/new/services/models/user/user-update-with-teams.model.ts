import { UserCreateWithTeams } from "./user-create-with-teams.model";

export interface UserUpdateWithTeams extends UserCreateWithTeams {
    id: number;
    dateCreated: Date;
}