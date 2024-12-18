export interface AuditTrailData {
    auditTrailId: number,
    userId: number,
    username: string,
    entityChanged: string | null,
    attributeChanged: string,
    changeFrom: string | null,
    changeTo: string | null,
    dateTimeEdited: string
}