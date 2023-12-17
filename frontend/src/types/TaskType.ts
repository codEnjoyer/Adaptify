export interface ITaskType {
    id: string,
    levelId: string,
    questions: IQuestionType[],
    requiresReview: boolean,
    scoreReward: number,
    type: string
}

export interface ITheoryUnitType {
    title: string,
    content: string,
}

export interface IAnswerType {
    id: string,
    questionId: string,
    answer: string
}


export interface IQuestionType {
    id: string,
    possibleAnswers: IAnswerType[],
    question: string,
    taskId: string,
    type: string,
    answer_options: IAnswerType[]
}


