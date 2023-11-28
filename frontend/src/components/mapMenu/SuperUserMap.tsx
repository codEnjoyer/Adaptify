import React, {useEffect} from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import {observer} from "mobx-react-lite";
import superUserStore from "../../store/superUserStore.ts";
import moduleMenuStore from "../../store/moduleMenuStore.ts";
import {IMapType} from "../../types/MapType.ts";

interface ISuperUserMap {

}

const SuperUserMap: React.FC<ISuperUserMap> = observer(() => {

    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[mapMenuStore.currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules()))
    }, []);

    function handleOnClickOptionMap(map: IMapType, indexMap: number) {
        mapMenuStore.selectMap(map)
        mapMenuStore.changeCurrentMapIndex(indexMap)
    }


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
                {mapMenuStore.availableMaps?.map((map, index) =>
                    <option key={map.id} value={map.title}
                            onClick={() => handleOnClickOptionMap(map, index)}>{map.title}</option>)}
            </select>

            <CustomButton text="Удалить выбранную карту"
                          handleOnClick={() => mapMenuStore.deleteMap(mapMenuStore.mapMenu?.id)}/>

            <select>
                {moduleMenuStore.availableModules.map((module) =>
                    <option key={module.id} value={module.title}>{module.title}</option>)}
            </select>
        </div>
    );
});

export default SuperUserMap;
