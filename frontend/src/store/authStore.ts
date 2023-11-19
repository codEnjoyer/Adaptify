import {makeAutoObservable} from "mobx";
import axios from "axios";


class AuthStore {
    isUserAuthorized: boolean = false
    userRole: string | null = null

    userLogin: string = ""
    userPassword: string = ""
    userEmail: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    signInUser() {
        this.isUserAuthorized = true
    }

    async logOutUser() {
        this.signOutUser()
        axios.post("http://localhost:8000/auth/logout").catch(reason => console.log(reason))
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

    changeUserEmail(newEmail: string) {
        this.userEmail = newEmail + "@example.com"
    }

    async signIn() {
        await axios.post("http://localhost:8000/auth/login", {
            username: this.userEmail,
            password: this.userPassword,
        }, {
            headers: {
                'access': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(() => {
                this.signInUser()
            })
            .catch((reason) => {
                alert(reason)
            })
    }

    async signUp() {
        axios.post("http://localhost:8000/auth/register", {
            username: this.userLogin,
            email: this.userEmail,
            password: this.userPassword
        }).then(r => {
            console.log(r.data)
            this.changeUserLogin("")
            this.changeUserPassword("")
        }).catch(() => {
            alert("Неправильно введены данные")
        })
    }
}

export default new AuthStore()
