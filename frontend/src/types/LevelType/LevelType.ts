import {ITheoryUnitType} from "../TheoryUnitType.ts";
import {ITaskType} from "../TaskType.ts";

export interface ILevelType {
    id: string,
    title: string,
    body?: string,
    theoryUnits?: ITheoryUnitType[]
    taskUnits?: ITaskType[]
}
