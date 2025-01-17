import { Team } from "./team.model";

export interface TeamWithDetails extends Team {
    username: string;
}