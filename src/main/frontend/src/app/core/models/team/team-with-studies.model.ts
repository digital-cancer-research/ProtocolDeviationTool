import { Study } from "../study.model";
/**
 * @interface
 * Represents a team with its studies
 */

export interface TeamWithStudies {
	teamId: number;
    teamName: string;
    studies: Study[];
    isEdited?: boolean;
}