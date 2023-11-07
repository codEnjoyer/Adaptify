import {makeAutoObservable} from "mobx";

class AuthStore {
    isUserAuthorized: boolean = false
    userLogin: string | null = null
    userPassword: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    signInUser() {
        this.isUserAuthorized = true
    }

    signOutUser() {
        this.isUserAuthorized = false;
    }
}

export default new AuthStore()
