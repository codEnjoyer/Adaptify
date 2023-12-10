import {IRuleValidationListType} from "../types/RuleValidationType.ts";

const rulesValidation: IRuleValidationListType = {
    login:
        {
            fieldName: "login", rules: {required: true, min: 6, max: 20, pattern: /^[a-zA-Z0-9_]+$/}
        },
    password:
        {
            fieldName: "password", rules: {required: true, min: 6, max: 20}
        }
}


export default rulesValidation;
