import {makeAutoObservable} from "mobx";

class AuthStore {
    isUserAuthorized: boolean = false
    userLogin: string = ""
    userPassword: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    signInUser() {
        this.isUserAuthorized = true
    }

    signOutUser() {
        this.isUserAuthorized = false
    }

    changeUserLogin(newLogin: string) {
        this.userLogin = newLogin
    }

    changeUserPassword(newPassword: string) {
        this.userPassword = newPassword
    }
}

export default new AuthStore()
