import { StudyBreakdown } from "./study-breakdown.model";

export interface StudyBarGraphData {
    studies: string[],
    data: StudyBreakdown[]
}