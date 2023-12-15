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
import {ILevelType} from "../../../types/LevelType.ts";

const SuperUserMap: React.FC = observer(() => {
    const [isUsersListModalOpen, setIsUserListModalOpen] = useState<boolean>(false)

    const [mapName, setMapName] = useState<string>("")
    const [currentMap, setCurrentMap] = useState<IMapType | undefined>(undefined)
    const [currentMapIndex, setCurrentMapIndex] = useState<number>(0)

    const [moduleName, setModuleName] = useState<string>("")
    const [currentModule, setCurrentModule] = useState<IModuleType | undefined>(undefined)
    const [currentModuleId, setCurrentModuleId] = useState<string>("")
    const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0)


    const [levelName, setLevelName] = useState<string>("")
    const [currentLevel, setCurrentLevel] = useState<ILevelType | undefined>(undefined)
    const [currentLevelId, setCurrentLevelId] = useState<string>("")
    const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0)


    // Загрузка карт модулей
    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules()))
    }, []);

    const handleOnClickChangeIsModalOpen = useCallback(() => {
        setIsUserListModalOpen(!isUsersListModalOpen)
    }, [isUsersListModalOpen])

    // Работа с картами

    const handleOnClickOptionMap = useCallback((map: IMapType, indexMap: number) => {
        setCurrentMap(map)
        setCurrentMapIndex(indexMap)
        mapMenuStore.fetchMapById(map.id).then()
    }, [])

    const handleOnChangeMapName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setMapName(e.currentTarget.value)
    }, [])


    const handleOnClickCreateMap = useCallback((mapName: string) => {
        mapName !== "" ? mapMenuStore.createMap(mapName).then(() => currentMap ? mapMenuStore.fetchAvailableMaps().then() : undefined) : alert("Введите название карты")
    }, [])

    const handleOnClickDeleteMap = useCallback((mapId: string) => {
        mapMenuStore.deleteMap(mapId).then(() => mapMenuStore.fetchAvailableMaps())
    }, [])


    // Работа с модулями

    const handleOnClickOptionModule = useCallback((module: IModuleType, index: number) => {
        console.log(module)
        moduleMenuStore.selectModule(module).then(() => moduleMenuStore.changeCurrentModuleIndex(index))
    }, [])

    const handleOnChangeModuleName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setModuleName(e.currentTarget.value)
    }, [])

    const handleOnClickCreateModule = useCallback((moduleName: string) => {
        moduleName !== "" ? moduleMenuStore.createModule(moduleName) : alert("Введите название модуля")
        moduleMenuStore.fetchModules().then()
    }, [])

    const handleOnClickDeleteModule = useCallback((moduleId: string) => {
        moduleMenuStore.deleteModule(moduleId).then(() => moduleMenuStore.fetchModules())
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
                currentUnitId={currentMap?.id}
                availableUnits={mapMenuStore.availableMaps}
            />

            <CreateUnit
                classNameSelect="available-modules"
                handleOnClickOptionUnit={handleOnClickOptionModule}
                handleOnClickDeleteUnit={handleOnClickDeleteModule}
                unitName="module"
                unitNameValue={moduleName}
                handleOnChangeUnitName={handleOnChangeModuleName}
                handleOnClickCreateUnit={handleOnClickCreateModule}
                currentUnitId={currentModule?.id}
                availableUnits={moduleMenuStore.availableModules}
            />
        </div>
    );
});

export default SuperUserMap;
