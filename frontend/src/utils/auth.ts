import {IRuleValidationType} from "../types/RuleValidationType.ts";

const rulesValidation: IRuleValidationType[] = [
    {fieldName: "nickname", rules: {required: true, min: 5, max: 20}},
    {fieldName: "password", rules: {required: true, min: 6, max: 20}}
]


