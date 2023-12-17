import React, {useCallback, useEffect, useState} from 'react';

import CustomButton from "../../../UIComponents/customButton/CustomButton.tsx";
import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UsersListModalBody from "./UsersListModalBody.tsx";
import CreateUnit from "./superUserControlPanel/CreateUnit.tsx";

import {observer} from "mobx-react-lite";
import mapMenuStore from "../../../store/mapMenuStore.ts";
import superUserStore from "../../../store/superUserStore.ts";
import moduleMenuStore from "../../../store/moduleMenuStore.ts";

import {IMapType} from "../../../types/MapType.ts";
import {IModuleType} from "../../../types/ModuleType.ts";

const SuperUserMap: React.FC = observer(() => {
    const [isUsersListModalOpen, setIsUserListModalOpen] = useState<boolean>(false)

    const [mapName, setMapName] = useState<string>("")
    const [moduleName, setModuleName] = useState<string>("")
    const [levelName, setLevelName] = useState<string>("")

    // Загрузка карт модулей
    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[mapMenuStore.currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules()))
    }, []);

    const handleOnClickChangeIsModalOpen = useCallback(() => {
        setIsUserListModalOpen(!isUsersListModalOpen)
    }, [isUsersListModalOpen])

    const handleOnChangeMapName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setMapName(e.currentTarget.value)
    }, [])

    const handleOnClickOptionMap = useCallback((map: IMapType) => {
        mapMenuStore.chooseMap(map)
    }, [])

    const handleOnClickDeleteMap = useCallback((mapId: string) => {
        mapMenuStore.deleteMap(mapId).then(() => mapMenuStore.fetchAvailableMaps().then())
    }, [])

    const handleOnClickCreateMap = useCallback((mapName: string) => {
        mapMenuStore.createMap(mapName)
            .then(() => mapMenuStore.fetchAvailableMaps()
                .then(() => setMapName("")))
    }, [])

    const handleOnChangeModuleName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setModuleName(e.currentTarget.value)
    }, [])

    const handleOnClickOptionModule = useCallback((module: IModuleType) => {
        moduleMenuStore.chooseModule(module)
    }, [])

    const handleOnClickDeleteModule = useCallback((mapId: string) => {
        moduleMenuStore.deleteModule(mapId).then(() => moduleMenuStore.fetchModules().then())
    }, [])

    const handleOnClickCreateModule = useCallback((moduleName: string) => {
        moduleMenuStore.createModule(moduleName)
            .then(() => moduleMenuStore.fetchModules()
                .then(() => setModuleName("")))
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

            <CreateUnit
                classNameSelect="available-maps"
                handleOnClickOptionUnit={handleOnClickOptionMap}
                handleOnClickDeleteUnit={handleOnClickDeleteMap}
                unitName="map"
                unitNameValue={mapName}
                handleOnChangeUnitName={handleOnChangeMapName}
                handleOnClickCreateUnit={handleOnClickCreateMap}
                currentUnitId={mapMenuStore.choosedMap ? mapMenuStore.choosedMap.id : null}
                availableUnits={mapMenuStore.availableMaps}
            />

            {/*<CreateUnit*/}
            {/*    classNameSelect="available-modules"*/}
            {/*    handleOnClickOptionUnit={handleOnClickOptionModule}*/}
            {/*    handleOnClickDeleteUnit={handleOnClickDeleteModule}*/}
            {/*    unitName="module"*/}
            {/*    unitNameValue={moduleName}*/}
            {/*    handleOnChangeUnitName={handleOnChangeModuleName}*/}
            {/*    handleOnClickCreateUnit={handleOnClickCreateModule}*/}
            {/*    currentUnitId={currentModule?.id}*/}
            {/*    availableUnits={moduleMenuStore.availableModules}*/}
            {/*/>*/}
        </div>
    );
});

export default SuperUserMap;
