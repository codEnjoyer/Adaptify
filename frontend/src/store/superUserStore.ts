import {makeAutoObservable} from "mobx";
import {IUserType} from "../types/UserType.ts";


class SuperUserStore {
    allUsers: IUserType[] = []
    currentUser: IUserType | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setAllUsers(fetchedUsers: IUserType[]) {
        this.allUsers = fetchedUsers
    }

    selectUser(newUser: IUserType | null) {
        this.currentUser = newUser
    }
}

export default new SuperUserStore()
