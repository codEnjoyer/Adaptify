import React, {useCallback, useEffect} from 'react';
import {IUserType} from "../../../../types/UserType.ts";

import {IAchievementType} from "../../../../types/AchievementType.ts";
import Achievements from "./Achievements/Achievements.tsx";
import UserInfo from "./UserInfo.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";


interface IUserProfileModalProps {
    img?: string
    user?: IUserType,
    formattedDate: string,
    logOut?: () => void
}


const UserProfileModalBody: React.FC<IUserProfileModalProps> = ({user, formattedDate, logOut}) => {
    const achievements: IAchievementType[] = [
        {id: "1", title: "Начало работы", description: "Описание 1"},
        {id: "2", title: "Середина работы ", description: "Описание 2"},
        {id: "3", title: "Конец работы ", description: "Описание 3"}
    ]

    useEffect(() => {
        console.log(user)
    }, [user])

    const handleOnLogOut = useCallback(() => {
        logOut ? logOut() : null
    }, [])

    return (
        <div>
            <div className="header-modal-user-profile">
                <h3 className="user-profile-title">ПРОФИЛЬ СОТРУДНИКА</h3>
            </div>
            {logOut ?
                <CustomButton className="user-profile-logout__btn" text="Выйти" handleOnClick={handleOnLogOut}/>
                : null
            }
            <UserInfo user={user} formattedDate={formattedDate}/>
            <Achievements achievements={achievements}/>
        </div>
    );
};

export default UserProfileModalBody;
