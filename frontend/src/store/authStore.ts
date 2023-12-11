import {makeAutoObservable} from "mobx";
import axios from "axios";


class AuthStore {
    isUserAuthorized: boolean = false
    // userRole: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    async logOutUser() {
        this.isUserAuthorized = false
        axios.post("http://localhost:8000/auth/logout").catch(reason => console.log(reason))
    }

    async signIn(login: string, password: string) {
        console.log(login, password)
        await axios.post("http://localhost:8000/auth/login", {
            username: login,
            password: password,
        }, {
            headers: {
                'access': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }, withCredentials: true
        })
            .then(() => this.isUserAuthorized = true)
            .catch(reason => console.log(reason))
    }

    private async signUp(login: string, password: string,) {
        axios.post("http://localhost:8000/auth/register", {
            username: login,
            password: password
        })
            .catch(() => alert("Неправильно введены данные"))
    }
}

export default new AuthStore()
