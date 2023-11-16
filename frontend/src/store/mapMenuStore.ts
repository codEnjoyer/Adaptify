import {makeAutoObservable} from "mobx";
import {GeolocationType} from "../types/GeolocationType.ts";

class MapMenuStore {

    coinsCount: number = 0
    moduleId: string | null = null
    geolocations: GeolocationType[] = []

    constructor() {
        makeAutoObservable(this)
    }
}

export default new MapMenuStore()
