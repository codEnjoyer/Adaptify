import React, {useEffect} from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import {observer} from "mobx-react-lite";
import superUserStore from "../../store/superUserStore.ts";

interface ISuperUserMap {

}

const SuperUserMap: React.FC<ISuperUserMap> = observer(() => {

    useEffect(() => {

    }, []);
    return (
        <div>
            <select>
                {superUserStore.allUsers.map((user) =>
                    <option key={user.username} value={user.username}>{user.username}</option>)}
            </select>
            <CustomInput type="text" value={mapMenuStore.newNameMap}
                         handleOnChange={(e) => mapMenuStore.changeNewMapName(e)}/>
            <CustomButton text="Создать новую карту"
                          handleOnClick={() => mapMenuStore.createMap(mapMenuStore.newNameMap)}/>

            <select>
                {mapMenuStore.availableMaps?.map((map) =>
                    <option key={map.id} value={map.title}
                            onClick={() => mapMenuStore.selectMap(map)}>{map.title}</option>)}
            </select>

            <CustomButton text="Удалить выбранную карту"
                          handleOnClick={() => mapMenuStore.deleteMap(mapMenuStore.mapMenu?.id)}/>

        </div>
    );
});

export default SuperUserMap;
