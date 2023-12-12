import {ITaskType, ITheoryUnitType} from "./TaskType.ts";

export interface ILevelType {
    id: string,
    title: string,
    body?: string,
    theoryUnits?: ITheoryUnitType[]
    taskUnits?: ITaskType[]
}
