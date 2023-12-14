import {makeAutoObservable} from "mobx";

import axios from "axios";

import mapMenuStore from "./mapMenuStore.ts";
import moduleMenuStore from "./moduleMenuStore.ts";

import {ILevelType} from "../types/LevelType.ts";

class levelStore {
    chosenTaskIndex: number = 1
    availableLevels: ILevelType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setChosenTaskIndex(index: number) {
        this.chosenTaskIndex = index
    }

    closeLevel() {
        this.chosenTaskIndex = 1
    }

    setAvailableLevels(levels: ILevelType[]) {
        this.availableLevels = levels
    }

    async fetchLevels() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.currentMapId + "/modules/" + moduleMenuStore.currentModuleId + "/levels")
            .then((response) => {
                this.setAvailableLevels([])
                this.setAvailableLevels(response.data)
            })
    }
}

export default new levelStore()
