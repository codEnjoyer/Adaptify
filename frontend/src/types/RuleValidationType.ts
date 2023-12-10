import {FieldValues, RegisterOptions} from "react-hook-form";

export interface IRuleValidationListType {
    login: IRuleValidationType,
    password: IRuleValidationType
}

export interface IRuleValidationType {
    fieldName: string,
    rules: RegisterOptions<FieldValues, string>
}
