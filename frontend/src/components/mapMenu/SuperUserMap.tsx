import React from 'react';
import {IUserType} from "../../types/UserType.ts";
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import {observer} from "mobx-react-lite";

interface ISuperUserMap {
    allUsers: IUserType[]
}

const SuperUserMap: React.FC<ISuperUserMap> = observer(({allUsers}) => {
    return (
        <div>
            <select>
                {allUsers?.map((user) =>
                    <option key={user.username} value={user.username}>{user.username}</option>)}
            </select>
            <CustomInput type="text" value={mapMenuStore.newNameMap}
                         handleOnChange={(e) => mapMenuStore.changeNewNameMap(e)}/>
            <CustomButton text="Создать новую карту"
                          handleOnClick={() => mapMenuStore.createMap(mapMenuStore.newNameMap)}/>

        </div>
    );
});

export default SuperUserMap;
