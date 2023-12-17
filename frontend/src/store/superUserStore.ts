import {makeAutoObservable} from "mobx";
import {IEmployeeType} from "../types/EmployeeType.ts";


class SuperUserStore {
    allEmployees: IEmployeeType[] = []
    currentEmployee: IEmployeeType | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setAllEmployees(fetchedEmployees: IEmployeeType[]) {
        this.allEmployees = fetchedEmployees
    }

    selectUser(newUser: IEmployeeType | null) {
        this.currentEmployee = newUser
    }
}

export default new SuperUserStore()
