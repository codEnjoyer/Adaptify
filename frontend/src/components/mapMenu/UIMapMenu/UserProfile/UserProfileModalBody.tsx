import React, {useEffect} from 'react';
import {IUserType} from "../../../../types/UserType.ts";

import {IAchievementType} from "../../../../types/AchievementType.ts";
import Achievements from "./Achievements/Achievements.tsx";
import UserInfo from "./UserInfo.tsx";


interface IUserProfileModalProps {
    img?: string
    user?: IUserType,
    formattedDate: string,
}


const UserProfileModalBody: React.FC<IUserProfileModalProps> = ({user, formattedDate}) => {
    const achievements: IAchievementType[] = [
        {id: "1", title: "Начало работы", description: "Описание 1"},
        {id: "2", title: "Середина работы ", description: "Описание 2"},
        {id: "3", title: "Конец работы ", description: "Описание 3"}
    ]

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div>
            <div className="header-modal-user-profile">
                <h3 className="user-profile-title">ПРОФИЛЬ СОТРУДНИКА</h3>
            </div>
            <UserInfo user={user} formattedDate={formattedDate}/>
            <Achievements achievements={achievements}/>
        </div>
    );
};

export default UserProfileModalBody;
