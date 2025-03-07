export interface AuditTrailData {
    username: string,
    date: Date,
    entity: string,
    action: string,
    originalValue: string,
    newValue: string,
}