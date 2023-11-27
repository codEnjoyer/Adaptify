import {makeAutoObservable} from "mobx";
import {IUserType} from "../types/UserType.ts";


class SuperUserStore {
    allUsers: IUserType[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setAllUsers(fetchedUsers: IUserType[]) {
        this.allUsers = fetchedUsers
    }


}

export default new SuperUserStore()
