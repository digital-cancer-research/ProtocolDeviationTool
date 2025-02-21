import { Study } from "../study/study.model";

export interface TeamWithStudies {
    id: number;
    name: string;
    studies: Study[];
}