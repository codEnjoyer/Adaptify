import {makeAutoObservable} from "mobx";
import axios from "axios";


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

    async signIn() {
        this.signInUser()
        axios.post("http://localhost:8000/auth/login", {
            username: this.userLogin,
            password: this.userPassword,
        })
            .then((resp) => {
                console.log(resp.data)
                this.signInUser()
            })
            .catch((reason) => {
                alert(reason)
                this.signOutUser()
            })
    }

    signUp() {
        axios.post("http://localhost:8000/auth/register", {
            username: this.userLogin,
            email: this.userLogin + "@example.com",
            password: this.userPassword
        })
            .then(r => console.log(r.data))
            .catch(reason => console.log(reason))
    }
}

export default new AuthStore()
