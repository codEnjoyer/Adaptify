import {makeAutoObservable} from "mobx";
import {IModuleType} from "../types/ModuleType.ts";
import axios from "axios";
import mapMenuStore from "./mapMenuStore.ts";

class ModuleMenuStore {
    availableModules: IModuleType[] = []
    choosedModule: IModuleType | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setAvailableModules(modules: IModuleType[]) {
        this.availableModules = modules
    }

    chooseModule = (newModule: IModuleType) => {
        this.choosedModule = newModule
    }

    async fetchModules() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/")
            .then((response) => {
                this.setAvailableModules([])
                this.setAvailableModules(response.data.filter((module: IModuleType) => module.map_id === mapMenuStore.choosedMap?.id))
            })
    }

    async fetchModuleById(id: string) {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/" + id).then((response) => {
            this.chooseModule(response.data)
        })
    }

    async createModule(title: string) {
        if (mapMenuStore.choosedMap?.id === undefined || mapMenuStore.availableMaps.length === 0) {
            alert("Выберите уровень для которого будете создавать карту")
            return
        }

        await axios.post("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/", {
            map_id: mapMenuStore.choosedMap?.id,
            title: title,
            previous_module_id: null,
            next_module_id: null,
        })
    }

    async deleteModule() {
        await axios.delete("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/" + this.choosedModule?.id).catch(() => alert("Выберите модуль"))
    }
}

export default new ModuleMenuStore()
