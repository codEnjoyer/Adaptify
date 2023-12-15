import {ITaskType, ITheoryUnitType} from "./TaskType.ts";

export type ILevelType = {
    id: string,
    title: string,
    body?: string,
    theoryUnits?: ITheoryUnitType[]
    taskUnits?: ITaskType[]
}
