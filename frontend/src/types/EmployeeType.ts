import {IUserType} from "./UserType.ts";

export interface IEmployeeType {
    tutor_id: string,
    name: string,
    last_name: string,
    hired_at: string,
    patronymic: string
    coins: number,
    id: string,
    user: IUserType
}
