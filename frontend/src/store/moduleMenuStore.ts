import {makeAutoObservable} from "mobx";
import {IModuleType} from "../types/ModuleType.ts";
import axios from "axios";
import mapMenuStore from "./mapMenuStore.ts";
import {v4 as uuidv4} from 'uuid';
import levelStore from "./levelStore.ts";

class ModuleMenuStore {
    currentModuleId: string | null = null
    modulesMap: string[] = []
    availableModules: IModuleType[] = []
    currentModule: IModuleType | null = null
    currentModuleIndex: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    setModulesMap(newModulesMap: string[]) {
        this.modulesMap = newModulesMap
    }

    setAvailableModules(modules: IModuleType[]) {
        this.availableModules = modules
    }

    async selectModule(newModule: IModuleType) {
        this.currentModule = newModule
        this.currentModuleId = newModule.id
    }

    changeCurrentModuleIndex(newIndex: number) {
        this.currentModuleIndex = newIndex
        this.fetchModuleById(this.availableModules[this.currentModuleIndex].id).then(() => levelStore.fetchLevels())
    }

    async fetchModules() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/")
            .then((response) => {
                this.setAvailableModules([])
                this.setAvailableModules(response.data.filter((module: IModuleType) => module.map_id === mapMenuStore.currentMapId))
            })
    }

    async createModule(title: string) {
        console.log(title)
        await axios.post("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/", {
            map_id: mapMenuStore.currentMapId,
            title: title,
            previous_module_id: null,
            next_module_id: null,
        })
    }

    async fetchModuleById(id: string) {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/" + id).then((response) => {
            this.selectModule(response.data)
            this.currentModuleId = response.data.id
        })
    }

    async deleteModule(id?: string) {
        await axios.delete("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/" + id).catch(() => alert("Выберите модуль"))
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
