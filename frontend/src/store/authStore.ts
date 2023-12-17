import {makeAutoObservable} from "mobx";
import axios from "axios";

class AuthStore {
    isUserAuthorized: boolean = false
    nickname: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setUser(nickname: string) {
        this.nickname = nickname
    }

    async signIn(login: string, password: string) {
        await axios.post("http://localhost:8000/auth/login", {
            username: login,
            password: password,
        }, {
            headers: {
                'access': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }, withCredentials: true
        })
            .then(() => this.authorize())
            .catch(reason => console.log(reason))
    }

    async logOutUser() {
        this.unauthorize()
        axios.post("http://localhost:8000/auth/logout").catch(reason => console.log(reason))
    }

    private unauthorize = () => {
        this.isUserAuthorized = false
    }

    private authorize = () => {
        this.isUserAuthorized = true
    }

    // private async signUp(login: string, password: string,) {
    //     axios.post("http://localhost:8000/auth/register", {
    //         username: login,
    //         password: password
    //     })
    //         .catch(() => alert("Неправильно введены данные"))
    // }
}

export default new AuthStore()
