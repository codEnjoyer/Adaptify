import {IQuestionType} from "./QuestionType.ts";

export interface ITaskType {
    id: string,
    levelId: string,
    questions: IQuestionType[],
    requiresReview: boolean,
    scoreReward: number,
    type: string
}
