export interface IRuleValidationType {
    fieldName: string,
    rules: IRulesType
}

export interface IRulesType {
    required?: boolean,
    maxLength?: number,
    pattern?: string,
    min?: number,
    max?: number
}
