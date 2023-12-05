import React from 'react';
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import {IUserType} from "../../../../types/UserType.ts";

interface IPropTypes {
    user: IUserType | undefined,
    formattedDate: string,
}

const UserInfo: React.FC<IPropTypes> = ({user, formattedDate}) => {
    return (
        <div>
            <img className="user-profile-photo"
                 src="https://clck.ru/36wj9g"
                 alt="Фото профиля"
            />
            <div className="user-info-fields">
                <CustomInput type="text" width="350px" disabled={true} value={user?.username}
                             height="55px" placeholder="ФИО"/>
                <CustomInput type="email" width="350px" placeholder="email" disabled={true} value={user?.email}
                             height="55px"/>
                <CustomInput type="text" width="350px" placeholder="Дата трудоустройства" disabled={true}
                             defaultValue={formattedDate}
                             height="55px"/>
            </div>
        </div>
    );
};

export default UserInfo;
