import {makeAutoObservable} from "mobx";

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
}

export default new levelStore()
