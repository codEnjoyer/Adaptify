import {FieldValues, RegisterOptions} from "react-hook-form";

export interface IRuleValidationListType {
    login: IRuleValidationType,
    password: IRuleValidationType
}

export interface IRuleValidationType {
    fieldName: "login" | "password",
    rules: RegisterOptions<FieldValues, string>
}
