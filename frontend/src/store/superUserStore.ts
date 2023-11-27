import {makeAutoObservable} from "mobx";
import {IUserType} from "../types/UserType.ts";


class SuperUserStore {
    constructor() {
        makeAutoObservable(this)
    }

    allUsers: IUserType = []
    
}

export default new SuperUserStore()
