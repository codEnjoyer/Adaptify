import {ITaskType, ITheoryUnitType} from "./TaskType.ts";

export interface ILevelType {
    id: string,
    title: string,
    body?: string,
    theory_units?: ITheoryUnitType[]
    task_units?: ITaskType[]
}
