import {ITheoryUnitType} from "./TheoryUnitType.ts";
import {ITaskType} from "./TaskType.ts";

export interface IMenuItemType, {
    length: number,
    type: string,
    item: ITheoryUnitType & ITaskType
}
