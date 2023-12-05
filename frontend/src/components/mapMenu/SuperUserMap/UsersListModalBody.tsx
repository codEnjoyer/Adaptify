import React, {ReactNode, useState} from 'react';
import {IUserType} from "../../../types/UserType.ts";
import superUserStore from "../../../store/superUserStore.ts";
import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UserProfileModalBody from "../UIMapMenu/UserProfile/UserProfileModalBody.tsx";

interface IUsersListModalBody {
    users: IUserType[]
}

const UsersListModalBody: React.FC<IUsersListModalBody> = ({users}) => {
    const [isUsersCardModalOpen, setIsUserCardModalOpen] = useState<boolean>(false)
    const [userProfileModalBody, setUserProfileModalBody] = useState<ReactNode>()

    const handleOnClickUserCard = (user: IUserType) => {
        setIsUserCardModalOpen(true)
        superUserStore.selectUser(user)
        setUserProfileModalBody(<UserProfileModalBody user={user} formattedDate=""/>)
    }

    const handleOnCloseUserCard = () => {
        setIsUserCardModalOpen(false)
        superUserStore.selectUser(null)
    }

    return (
        <div>
            <div className="users-list">
                {users.map((user) => (
                    isUsersCardModalOpen
                        ? <ModalWindow body={userProfileModalBody}
                                       onClose={handleOnCloseUserCard}/>
                        : (
                            <div className="users-list-user" onClick={() => handleOnClickUserCard(user)}>
                                <div className="users-list-user-name">
                                    {user.username}
                                </div>
                                <img src="https://i.ibb.co/GQzwW82/Qf-EKp-Mlf-Xfw.jpg" alt="Employee Photo"
                                     className="user-photo"/>
                            </div>
                        )
                ))}
            </div>
        </div>
    );
};

export default UsersListModalBody;
