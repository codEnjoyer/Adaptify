import {makeAutoObservable} from "mobx";
import axios from "axios";
import mapMenuStore from "./mapMenuStore.ts";
import {IModuleType} from "../types/ModuleType.ts";

class levelStore {
    chosenTaskIndex: number = 1

    constructor() {
        makeAutoObservable(this)
    }

    setChosenTaskIndex(index: number) {
        this.chosenTaskIndex = index
    }

    closeLevel() {
        this.chosenTaskIndex = 1
    }

    async fetchLevels() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/")
            .then((response) => {
                this.setAvailableModules([])
                this.setAvailableModules(response.data.filter((module: IModuleType) => module.map_id === mapMenuStore.currentMapId))
            })
    }
}

export default new levelStore()
