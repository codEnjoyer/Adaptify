import {makeAutoObservable} from "mobx";

class LevelStore {
    chosenTaskIndex: number = 1

    constructor() {
        makeAutoObservable(this)
    }

    setChosenTaskIndex(index: number) {
        this.chosenTaskIndex = index
    }
}
