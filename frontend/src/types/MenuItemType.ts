import {ITaskType, ITheoryUnitType} from "./TaskType.ts";

export interface IMenuItemType {
    length: number,
    type: string,
    item: ITheoryUnitType & ITaskType
}
