import {IAnswerType} from "./AnswerType.ts";

export interface IQuestionType {
    id: string
    possibleAnswers: IAnswerType[]
    question: string
    taskId: string
    type: string
}
