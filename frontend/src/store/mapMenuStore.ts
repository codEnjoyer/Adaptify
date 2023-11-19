import {makeAutoObservable} from "mobx";
import axios from "axios";

class MapMenuStore {
    mapMenu: object | null = null
    titleMap: string = ""
    idMap: string = ""
    idsModules: string[] = []

    availableMaps: string[] = []
    currentMap: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    async fetchAvailableMaps() {
        await axios.get("http://localhost:8000/maps/").then((response) => this.availableMaps = response.data)
    }

    fetchMapById(id: string) {
        axios.get("http://localhost:8000/maps/" + id).then((response) => this.mapMenu = response.data)
    }
}

export default new MapMenuStore()
