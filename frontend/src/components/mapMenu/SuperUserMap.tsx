import React from 'react';
import {IUserType} from "../../types/UserType.ts";

interface ISuperUserMap {
    allUsers: IUserType[]
}

const SuperUserMap: React.FC<ISuperUserMap> = ({allUsers}) => {
    return (
        <div>
            <select>
                {allUsers?.map((user) =>
                    <option key={user.username} value={user.username}>{user.username}</option>)}
            </select>
        </div>
    );
};

export default SuperUserMap;
