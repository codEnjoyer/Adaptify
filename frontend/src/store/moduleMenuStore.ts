import {makeAutoObservable} from "mobx";
import {IModuleType} from "../types/ModuleType.ts";
import axios from "axios";
import mapMenuStore from "./mapMenuStore.ts";

class ModuleMenuStore {
    currentModuleId: string | null = null
    modulesMap: string[] = []
    availableModules: IModuleType[] = []
    currentModule: IModuleType | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setModulesMap(newModulesMap: string[]) {
        this.modulesMap = newModulesMap
    }

    setAvailableModules(modules: IModuleType[]) {
        this.availableModules = modules
    }

    setCurrentModule(newModule: IModuleType) {
        this.currentModule = newModule
    }

    async fetchModules() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/")
            .then((response) => {
                this.setAvailableModules([])
                this.setAvailableModules(response.data.filter((module: IModuleType) => module.map_id === mapMenuStore.currentMapId))
            })
    }

    async createModule(mapId: string, title: string, previousModuleId: string, nextModuleId: string) {
        axios.post("http://localhost:8000/maps/" + mapId + "/modules/", {
            map_id: mapId,
            title: title,
            previous_module_id: previousModuleId,
            next_module_id: nextModuleId,
        })
    }

    async fetchModuleById(id: string) {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/" + id).then((response) => {
            this.setCurrentModule(response.data)
            this.currentModuleId = response.data.id
        })
    }

    async deleteModule(id: string) {
        axios.delete("http://localhost:8000/modules/" + id)
    }

    updateModuleById(mapId: string, id: string, title?: string, previousModuleId?: string, nextModuleId?: string, levels?: string[]) {
        axios.patch("http://localhost:8000/modules/" + id, {
            id: id,
            map_id: mapId,
            title: title,
            previous_module_id: previousModuleId,
            next_module_id: nextModuleId,
            levels_ids: levels
        })
    }
}

export default new ModuleMenuStore()
