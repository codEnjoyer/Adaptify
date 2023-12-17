import {makeAutoObservable} from "mobx";

import axios from "axios";

import mapMenuStore from "./mapMenuStore.ts";
import moduleMenuStore from "./moduleMenuStore.ts";

import {ILevelType} from "../types/LevelType.ts";

class levelStore {
    chosenTaskIndex: number = 1
    availableLevels: ILevelType[] = []
    choosedLevel: ILevelType | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setChosenTaskIndex(index: number) {
        this.chosenTaskIndex = index
    }

    closeLevel() {
        this.chosenTaskIndex = 1
    }

    chooseLevel(level: ILevelType) {
        this.choosedLevel = level
    }

    setAvailableLevels(levels: ILevelType[]) {
        this.availableLevels = levels
    }

    async fetchLevels() {
        await axios.get("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/" + moduleMenuStore.choosedModule?.id + "/levels")
            .then((response) => {
                this.setAvailableLevels([])
                this.setAvailableLevels(response.data)
            })
    }

    async createLevel(levelName: string) {
        if (!mapMenuStore.choosedMap?.id) {
            alert("Выберите карту")
            return
        }

        if (!moduleMenuStore.choosedModule?.id) {
            alert("Выберите модуль")
            return
        }
        await axios.post("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/" + moduleMenuStore.choosedModule?.id + "/levels/", {title: levelName})
    }

    async deleteLevel() {
        await axios.delete("http://localhost:8000/maps/" + mapMenuStore.choosedMap?.id + "/modules/" + moduleMenuStore.choosedModule?.id + "/levels/" + this.choosedLevel?.id)
    }
}

export default new levelStore()
