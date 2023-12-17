import React, {ReactNode, useCallback, useState} from 'react';

import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UserProfileModalBody from "../UIMapMenu/UserProfile/UserProfileModalBody.tsx";

import superUserStore from "../../../store/superUserStore.ts";
import {IEmployeeType} from "../../../types/EmployeeType.ts";

interface IUsersListModalBody {
    employees: IEmployeeType[]
}

const UsersListModalBody: React.FC<IUsersListModalBody> = ({employees}) => {
    const [isUsersCardModalOpen, setIsUserCardModalOpen] = useState<boolean>(false)
    const [userProfileModalBody, setUserProfileModalBody] = useState<ReactNode>()

    const handleOnClickUserCard = (employee: IEmployeeType) => {
        setIsUserCardModalOpen(true)
        superUserStore.selectUser(employee)
        setUserProfileModalBody(<UserProfileModalBody employee={employee}/>)
    }

    const handleOnCloseUserCard = useCallback(() => {
        setIsUserCardModalOpen(false)
        superUserStore.selectUser(null)
    }, [])

    return (
        <div>
            <div className="users-list">
                {employees.map((employee) => (
                    isUsersCardModalOpen
                        ? <ModalWindow
                            body={userProfileModalBody}
                            onClose={handleOnCloseUserCard}
                        />
                        : (
                            <div key={employee.name} className="users-list-user"
                                 onClick={() => handleOnClickUserCard(employee)}>
                                <div className="users-list-user-info">
                                    <div className="users-list-user-lastname">{employee.last_name}</div>
                                    <div className="users-list-user-name">{employee.name}</div>
                                    <div className="users-list-user-patronymic">{employee.patronymic}</div>
                                </div>
                                <img src="https://i.ibb.co/GQzwW82/Qf-EKp-Mlf-Xfw.jpg" alt="Employee Photo"
                                     className="user-photo"
                                />
                            </div>
                        )
                ))}
            </div>
        </div>
    );
};

export default UsersListModalBody;
