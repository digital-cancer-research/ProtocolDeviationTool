export interface AuditTrailData {
    auditTrailId: number,
    userId: number,
    username: string,
    entityChanged: string,
    attributeChanged: string,
    changeFrom: string,
    changeTo: string,
    dateTimeEdited: string
}