import {makeAutoObservable} from "mobx";

class AuthStore {
    isUserAuthorized: boolean = false
    userLogin: string = ""
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

    changeUserLogin(newValue: string) {
        this.userLogin = newValue
    }
}

export default new AuthStore()
