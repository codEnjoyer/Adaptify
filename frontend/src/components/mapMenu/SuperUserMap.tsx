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
        mapMenuStore.selectMap(map).then(() => mapMenuStore.changeCurrentMapIndex(indexMap))
    }


    return (
        <div>
            <form>
                <select>
                    {superUserStore.allUsers.map((user) =>
                        <option key={user.username} value={user.username}>{user.username}</option>)}
                </select>

                <div className="map-create">
                    <CustomInput type="text" value={mapMenuStore.newNameMap}
                                 handleOnChange={(e) => mapMenuStore.changeNewMapName(e)}/>
                    <CustomButton text="Создать новую карту"
                                  handleOnClick={() => mapMenuStore.createMap(mapMenuStore.newNameMap)}/>
                </div>

                <select className="available-maps">
                    {mapMenuStore.availableMaps?.map((map, index) =>
                        <option key={map.id} value={map.title}
                                onClick={() => handleOnClickOptionMap(map, index)}>{map.title}</option>)}
                    <CustomButton text="Удалить выбранную карту" additionalClassName="delete-map__btn"
                                  handleOnClick={() => mapMenuStore.deleteMap(mapMenuStore.mapMenu?.id)}/>
                </select>

                <select className="available-modules">
                    {moduleMenuStore.availableModules.map((module) =>
                        <option key={module.id} value={module.title}>{module.title}</option>)}
                </select>
            </form>
        </div>
    );
});

export default SuperUserMap;
