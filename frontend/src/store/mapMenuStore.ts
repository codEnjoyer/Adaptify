import {makeAutoObservable} from "mobx";
import axios from "axios";
import {IMapType} from "../types/MapType.ts";

class MapMenuStore {
    // Доступное всем пользователям
    mapMenu: IMapType | null = null
    choosedMap: IMapType | null = null
    availableMaps: IMapType[] = []
    currentMapIndex: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAvailableMaps() {
        await axios.get("http://localhost:8000/maps/").then((response) => {
            this.setMaps([])
            this.setMaps(response.data)
            this.chooseMap(response.data[0])
        })
    }

    setMaps(maps: IMapType[]) {
        this.availableMaps = maps
    }

    async chooseMap(map: IMapType) {
        this.choosedMap = map
    }

    async fetchMapById(id: string) {
        await axios.get("http://localhost:8000/maps/" + id).then((response) => {
            this.mapMenu = response?.data
        })
    }

    async createMap(mapName: string) {
        await axios.post("http://localhost:8000/maps/", {title: mapName}).then()
    }

    async deleteMap() {
        await axios.delete("http://localhost:8000/maps/" + this.choosedMap?.id)
    }
}

export default new MapMenuStore()
