import { Role } from "./role.enum";

export interface User {
    id: number;
    username: string;
    role: Role,
    isSite: boolean;
    isSponsor: boolean;
    dateCreated: Date;
}