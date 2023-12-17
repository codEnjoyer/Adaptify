import React, {useCallback, useEffect, useState} from 'react';

import CustomButton from "../../../UIComponents/customButton/CustomButton.tsx";
import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UsersListModalBody from "./UsersListModalBody.tsx";
import CreateUnit from "./superUserControlPanel/CreateUnit.tsx";

import {observer} from "mobx-react-lite";
import mapMenuStore from "../../../store/mapMenuStore.ts";
import moduleMenuStore from "../../../store/moduleMenuStore.ts";
import levelStore from "../../../store/levelStore.ts";
import superUserStore from "../../../store/superUserStore.ts";

import {IMapType} from "../../../types/MapType.ts";
import {IModuleType} from "../../../types/ModuleType.ts";
import {ILevelType} from "../../../types/LevelType.ts";

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
        mapMenuStore.chooseMap(map).then(() => refreshData())
    }, [])

    const handleOnClickDeleteMap = useCallback(() => {
        mapMenuStore.deleteMap().then(() => refreshData())
    }, [])

    const handleOnClickCreateMap = useCallback((mapName: string) => {
        mapMenuStore.createMap(mapName)
            .then(() => {
                refreshData()
                setMapName("")
            })
    }, [])

    const handleOnChangeModuleName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setModuleName(e.currentTarget.value)
    }, [])

    const handleOnClickOptionModule = useCallback((module: IModuleType) => {
        moduleMenuStore.chooseModule(module)
    }, [])

    const handleOnClickDeleteModule = useCallback(() => {
        moduleMenuStore.deleteModule().then(() => refreshData())
    }, [])

    const handleOnClickCreateModule = useCallback((moduleName: string) => {
        moduleMenuStore.createModule(moduleName)
            .then(() => {
                refreshData()
                setModuleName("")
            })
    }, [])

    const handleOnChangeLevelName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setLevelName(e.currentTarget.value)
    }, [])

    const handleOnClickOptionLevel = useCallback((level: ILevelType) => {
        levelStore.chooseLevel(level)
    }, [])

    const handleOnClickDeleteLevel = useCallback(() => {
        levelStore.deleteLevel().then(() => refreshData())
    }, [])

    const handleOnClickCreateLevel = useCallback((levelName: string) => {
        levelStore.createLevel(levelName)
            .then(() => {
                refreshData()
                setLevelName("")
            })
    }, [])

    const refreshData = () => {
        mapMenuStore.fetchAvailableMaps().then(() => {
            if (mapMenuStore.choosedMap !== null) {
                moduleMenuStore.fetchModules().then(() => {
                    if (moduleMenuStore.choosedModule !== null) {
                        levelStore.fetchLevels().then()
                    }
                })
            }
        })
    }

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
                currentUnitId={mapMenuStore.choosedMap?.id}
                // @ts-ignore: Unreachable code error
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
                currentUnitId={moduleMenuStore.choosedModule?.id}
                // @ts-ignore: Unreachable code error
                availableUnits={moduleMenuStore.availableModules}
            />

            <CreateUnit
                classNameSelect="available-levels"
                handleOnClickOptionUnit={handleOnClickOptionLevel}
                handleOnClickDeleteUnit={handleOnClickDeleteLevel}
                unitName="level"
                unitNameValue={levelName}
                handleOnChangeUnitName={handleOnChangeLevelName}
                handleOnClickCreateUnit={handleOnClickCreateLevel}
                currentUnitId={levelStore.choosedLevel?.id}
                // @ts-ignore: Unreachable code error
                availableUnits={levelStore.availableLevels}
            />
        </div>
    );
});

export default SuperUserMap;
