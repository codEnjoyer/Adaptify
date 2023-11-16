import {makeAutoObservable} from "mobx";

class AuthStore {
    isUserAuthorized: boolean = false
    userRole: string | null = null

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

    setUserRole(newUserRole: string) {
        this.userRole = newUserRole
    }
}

export default new AuthStore()
