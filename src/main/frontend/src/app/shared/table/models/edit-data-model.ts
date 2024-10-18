import { DataTableEntry } from "src/app/core/models/data/data-table-entry.model";

export interface EditDataModel {
    type: EditType,
    data: DataTableEntry
}

export enum EditType {
    CLOSE,
    CANCEL,
    CONFIRM
}