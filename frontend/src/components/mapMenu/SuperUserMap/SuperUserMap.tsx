import React, {useCallback, useEffect, useState} from 'react';
import CustomButton from "../../../UIComponents/customButton/CustomButton.tsx";
import mapMenuStore from "../../../store/mapMenuStore.ts";
import CustomInput from "../../../UIComponents/customInput/CustomInput.tsx";
import {observer} from "mobx-react-lite";
import superUserStore from "../../../store/superUserStore.ts";
import moduleMenuStore from "../../../store/moduleMenuStore.ts";
import {IMapType} from "../../../types/MapType.ts";
import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UsersListModalBody from "./UsersListModalBody.tsx";
import CustomAddButton from "../../../UIComponents/customAddButton/CustomAddButton.tsx";
import {IModuleType} from "../../../types/ModuleType.ts";

interface ISuperUserMap {

}

const SuperUserMap: React.FC<ISuperUserMap> = observer(() => {
    const [isUsersListModalOpen, setIsUserListModalOpen] = useState<boolean>(false)

    const [mapName, setMapName] = useState<string>("")
    const [moduleName, setModuleName] = useState<string>("")
    const [levelName, setLevelName] = useState<string>("")

    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[mapMenuStore.currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules()))
    }, []);

    const handleOnClickOptionMap = useCallback((map: IMapType, indexMap: number) => {
        mapMenuStore.selectMap(map).then(() => mapMenuStore.changeCurrentMapIndex(indexMap))
    }, [])

    const handleOnClickOptionModule = useCallback((module: IModuleType, index: number) => {
        console.log(module)
        moduleMenuStore.selectModule(module).then(() => moduleMenuStore.changeCurrentModuleIndex(index))
    }, [])

    const handleOnClickChangeIsModalOpen = useCallback(() => {
        setIsUserListModalOpen(!isUsersListModalOpen)
    }, [isUsersListModalOpen])


    const handleOnChangeMapName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setMapName(e.currentTarget.value)
    }, [])

    const handleOnClickCreateMap = useCallback((mapName: string) => {
        mapName !== "" ? mapMenuStore.createMap(mapName) : alert("Введите название карты")
        mapMenuStore.fetchAvailableMaps().then()
    }, [])


    const handleOnChangeModuleName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setModuleName(e.currentTarget.value)
    }, [])

    const handleOnClickCreateModule = useCallback((moduleName: string) => {
        moduleName !== "" ? moduleMenuStore.createModule(moduleName) : alert("Введите название модуля")
        moduleMenuStore.fetchModules().then()
    }, [])

    return (
        <div>
            {
                isUsersListModalOpen
                    ? <ModalWindow
                        onClose={handleOnClickChangeIsModalOpen}
                        body={<UsersListModalBody users={superUserStore.allUsers}/>}
                        windowContentStyles=""
                    />
                    : null
            }


            <CustomButton
                className="users-list__btn"
                handleOnClick={handleOnClickChangeIsModalOpen}
                text="Открыть список сотрудников"
            />

            <br/>

            <select className="available-maps">
                <option value="-"></option>
                {mapMenuStore.availableMaps?.map((map, index) =>
                    <option
                        key={map.id}
                        value={map.title}
                        onClick={() => handleOnClickOptionMap(map, index)}
                    >
                        {map.title}
                    </option>)
                }
            </select>

            <CustomButton
                text="Удалить выбранную карту"
                className="delete-map__btn"
                handleOnClick={() => mapMenuStore.deleteMap(mapMenuStore.mapMenu?.id)}
            />

            <div className="map-creator-item map-create">
                <CustomInput
                    type="text"
                    value={mapName}
                    handleOnChange={(e) => handleOnChangeMapName(e)}
                />
                <CustomAddButton
                    handleOnClick={() => handleOnClickCreateMap(mapName)}
                />
            </div>


            <div className="change-module">
            <select className="available-modules">
                {moduleMenuStore.availableModules.map((module, index) =>
                    <option
                        key={module.id}
                        value={module.title}
                        onClick={() => handleOnClickOptionModule(module, index)}
                    >
                        {module.title}
                    </option>)
                }
            </select>


            <CustomButton
                text="Удалить выбранный модуль"
                className="delete-module__btn"
                handleOnClick={() => moduleMenuStore.deleteModule(moduleMenuStore.currentModule?.id)}
            />
            </div>

            <div className="map-creator-item module-create">
                <CustomInput
                    type="text"
                    value={moduleName}
                    handleOnChange={(e) => handleOnChangeModuleName(e)}
                />
                <CustomAddButton
                    handleOnClick={() => handleOnClickCreateModule(moduleName)}
                />
            </div>
        </div>
    );
});

export default SuperUserMap;
