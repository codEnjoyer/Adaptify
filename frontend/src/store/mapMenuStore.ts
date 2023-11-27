import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IMapType} from "../types/MapType.ts";
import {ILevelType} from "../types/LevelType/LevelType.ts";
import {IFetchLevelType} from "../types/LevelType/FetchLevelType.ts";
import moduleMenuStore from "./moduleMenuStore.ts";

class MapMenuStore {
    mapMenu: IMapType | null = null
    availableMaps: IMapType[] = []

    currentMapId: string | null = null
    currentLevelId: string | null = null

    availableLevels: ILevelType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAvailableMaps() {
        await axios.get("http://localhost:8000/maps/").then((response) => this.availableMaps = response.data)
    }

    createMap(mapName: string) {
        axios.post("http://localhost:8000/maps/", {title: mapName})
    }

    async fetchMapById(id: string) {
        await axios.get("http://localhost:8000/maps/" + id).then((response) => {
            this.mapMenu = response?.data
            this.currentMapId = response?.data.id
        })
    }

    deleteMap(id: string) {
        axios.delete("http://localhost:8000" + id)
    }

    updateMapById(id: string, title: string, modulesIds?: string[]) {
        axios.patch("http://localhost:8000/maps/" + id, {
            id: id,
            title: title,
            modules_ids: modulesIds
        })
    }


    setAvailableLevels(levels: IFetchLevelType[]) {
        this.availableLevels = levels.map((level) => {
            return {
                id: level.id,
                title: level.title,
                body: level.body,
                theoryUnits: level.theory_units,
                taskUnits: level.task_units
            }
        })
    }


    async fetchLevels() {
        await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + moduleMenuStore.currentModuleId + "/levels/")
            .then((response) => this.setAvailableLevels(response.data))
    }

    // async fetchLevelById(id: string) {
    //     await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + id).then((response) => {
    //         this.currentLevelId = response.data
    //     })
    // }

    // createTheoryUnit() {
    //     axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + this.currentLevelId + "/theory", {
    //         title: "Заголовок 1",
    //         content: "Контент"
    //     })
    // }

    // createTaskUnit() {
    //     axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + this.currentLevelId + "/tasks", {
    //         type: "test",
    //         score_reward: 100,
    //         requires_review: false
    //     })
    // }

    // addQuestionToTaskUnit() {
    //     axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId
    //         + "/levels/" + this.currentLevelId + "/tasks/" + "b12de86e-fcd9-4761-89f0-b80d9583822d",
    //         {
    //             type: "singlechoice",
    //             question: "Кто такой вопрос?",
    //             possible_answers: [
    //                 {
    //                     answer: "Я",
    //                     is_correct: false
    //                 },
    //                 {
    //                     answer: "Не я",
    //                     is_correct: true
    //                 },
    //                 {
    //                     answer: "Не ты",
    //                     is_correct: false
    //                 }
    //             ]
    //         })
    // }
}

export default new MapMenuStore()
