import {ILevelType} from "./LevelType.ts";

export interface IModuleType {
    mapId: string,
    title: string,
    moduleId: string,
    modules_ids: ILevelType[]
}
