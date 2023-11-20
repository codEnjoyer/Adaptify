import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IMapType} from "../types/MapType.ts";
import {IModuleType} from "../types/ModuleType.ts";
import {ILevelType} from "../types/LevelType.ts";

class MapMenuStore {
    mapMenu: IMapType | null = null
    availableMaps: IMapType[] = []

    currentMapId: string | null = null
    currentModuleId: string | null = null
    currentLevelId: string | null = null

    modulesMap: string[] = []
    availableModules: IModuleType[] = []
    currentModule: IModuleType | null = null

    availableLevels: ILevelType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAvailableMaps() {
        await axios.get("http://localhost:8000/maps/").then((response) => this.availableMaps = response.data)
    }

    createMap(id: string) {
        axios.post("http://localhost:8000/maps/" + id)
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

    setModulesMap(newModulesMap: string[]) {
        this.modulesMap = newModulesMap
    }

    setAvailableModules(modules: IModuleType[]) {
        this.availableModules = modules
    }

    setAvailableLevels(levels: ILevelType[]) {
        this.availableLevels = levels
    }

    setCurrentModule(newModule: IModuleType) {
        this.currentModule = newModule
    }

    async fetchModules() {
        await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/")
            .then((response) => this.setAvailableModules(response.data))
    }

    async createModule(mapId: string, title: string, previousModuleId: string, nextModuleId: string, moduleId: string, levels_ids: string[]) {
        axios.post("http://localhost:8000/modules/", {
            map_id: mapId,
            title: title,
            previous_module_id: previousModuleId,
            next_module_id: nextModuleId,
            id: moduleId,
            levels_ids: levels_ids
        })
    }

    async fetchModuleById(id: string) {
        await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + id).then((response) => {
            this.setCurrentModule(response.data)
            this.currentModuleId = response.data.id
        })
    }

    async fetchLevels() {
        await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/")
            .then((response) => this.setAvailableLevels(response.data))
    }

    async fetchLevelById(id: string) {
        await axios.get("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + id).then((response) => {
            this.currentLevelId = response.data
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

    createTheoryUnit() {
        axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + this.currentLevelId + "/theory", {
            title: "Заголовок 1",
            content: "Контент"
        })
    }

    createTaskUnit() {
        axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId + "/levels/" + this.currentLevelId + "/tasks", {
            type: "test",
            score_reward: 100,
            requires_review: false
        })
    }

    addQuestionToTaskUnit() {
        axios.post("http://localhost:8000/maps/" + this.currentMapId + "/modules/" + this.currentModuleId
            + "/levels/" + this.currentLevelId + "/tasks/" + "b12de86e-fcd9-4761-89f0-b80d9583822d",
            {
                type: "singlechoice",
                question: "Кто такой вопрос?",
                possible_answers: [
                    {
                        answer: "Я",
                        is_correct: false
                    },
                    {
                        answer: "Не я",
                        is_correct: true
                    },
                    {
                        answer: "Не ты",
                        is_correct: false
                    }
                ]
            })
    }
}

export default new MapMenuStore()
