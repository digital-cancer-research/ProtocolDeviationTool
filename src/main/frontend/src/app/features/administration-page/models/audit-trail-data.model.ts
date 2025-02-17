export interface AuditTrailData {
    username: string,
    date: Date,
    action: string,
    originalValue: string,
    newValue: string,
}