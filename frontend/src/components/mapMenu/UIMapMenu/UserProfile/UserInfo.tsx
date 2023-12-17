import React from 'react';
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import {IEmployeeType} from "../../../../types/EmployeeType.ts";

interface IPropTypes {
    employee: IEmployeeType | undefined,
}

const UserInfo: React.FC<IPropTypes> = ({employee}) => {
    return (
        <div>
            <img
                className="user-profile-photo"
                src="https://clck.ru/36wj9g"
                alt="Фото профиля"
            />
            <div className="user-info-fields">
                <CustomInput
                    type="text"
                    width="350px"
                    disabled={true}
                    value={`${employee?.last_name} ${employee?.name} ${employee?.patronymic}`}
                    height="55px"
                    placeholder="ФИО"
                />

                <CustomInput
                    type="email"
                    width="350px"
                    placeholder="email"
                    disabled={true}
                    value={employee?.user.email}
                    height="55px"
                />
                <CustomInput
                    type="text"
                    width="350px"
                    placeholder="Дата трудоустройства"
                    disabled={true}
                    defaultValue={employee ? employee?.hired_at.split("-").reverse().join(".") : "01.01.1999"}
                    height="55px"
                />
            </div>
        </div>
    );
};

export default UserInfo;
