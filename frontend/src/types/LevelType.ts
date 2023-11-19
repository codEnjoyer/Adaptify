import {ITaskType} from "./TaskType.ts";

export interface ILevelType {
    id: string,
    levels: {
        levelName: string,
        title: string
        menu: ITaskType[]
    }[]
}
