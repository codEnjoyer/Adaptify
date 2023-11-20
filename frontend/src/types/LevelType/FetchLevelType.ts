import {ITheoryUnitType} from "../TheoryUnitType.ts";
import {ITaskType} from "../TaskType.ts";

export interface IFetchLevelType {
    id: string,
    title: string,
    body?: string,
    theory_units?: ITheoryUnitType[]
    task_units?: ITaskType[]
}
