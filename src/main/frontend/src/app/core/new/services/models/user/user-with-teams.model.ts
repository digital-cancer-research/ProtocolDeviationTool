import { Team } from "../team/team.model";
import { User } from "./user.model";

export interface UserWithTeams extends User {
    teams: Team[]
}