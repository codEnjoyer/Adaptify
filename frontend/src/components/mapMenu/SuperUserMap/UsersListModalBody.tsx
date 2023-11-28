import React from 'react';
import {IUserType} from "../../../types/UserType.ts";

interface IUsersListModalBody {
    users: IUserType[]
}

const UsersListModalBody: React.FC<IUsersListModalBody> = ({users}) => {
    return (
        <div>
            <div className="users-list">
                {users.map((user) => (
                    <div className="users-list-user">
                        <div className="users-list-user-name">
                            {user.username}
                        </div>
                        <img src="https://i.ibb.co/GQzwW82/Qf-EKp-Mlf-Xfw.jpg" alt="Employee Photo" className="user-photo"/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersListModalBody;
