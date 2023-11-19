import {IModuleType} from "./ModuleType.ts";

export interface IMapType {
    id: string,
    title: string,
    modules_ids: IModuleType[]
}
