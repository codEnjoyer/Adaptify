import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IMapType} from "../types/MapType.ts";
import {IModuleType} from "../types/ModuleType.ts";

class MapMenuStore {
    mapMenu: IMapType | null = null
    availableMaps: IMapType[] = []

    modulesMap: IModuleType | null = null
    availableModules: IModuleType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAvailableMaps() {
        await axios.get("http://localhost:8000/maps/").then((response) => this.availableMaps = response.data)
    }

    async fetchMapById(id: string) {
        await axios.get("http://localhost:8000/maps/" + id).then((response) => this.mapMenu = response.data)
    }

    setModulesMap(newModulesMap: IModuleType) {
        this.modulesMap = newModulesMap
    }

    // updateMapById(id: string) {
    //     axios.patch(id, {
    //         id: id,
    //         title: "Карта 1",
    //         modules_ids: ["3fa85f64-5717-4562-b3fc-2c963f66afa6", "3fa85f64-5717-4562-b3fc-2c963f66afa7"]
    //     })
    // }
}

export default new MapMenuStore()
