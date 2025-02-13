import { DataTableEntry } from "./data-table-entry.model";

export interface DataUpdate extends Omit<DataTableEntry, 'isEdited'> {
    adminId: number;
}