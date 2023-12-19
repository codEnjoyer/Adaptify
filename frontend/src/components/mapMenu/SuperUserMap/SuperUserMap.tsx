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
import axios from "axios";
import MapsListModalBody from "./superUserControlPanel/MapsListModalBody.tsx";

interface ISuperUserMapProps {
    logOut: () => void
}

const SuperUserMap: React.FC<ISuperUserMapProps> = observer(({logOut}) => {
    const [isUsersListModalOpen, setIsUserListModalOpen] = useState<boolean>(false)

    const [isUsersMapsModalOpen, setIsUsersMapsModalOpen] = useState<boolean>(false)
    const [isUsersModulesModalOpen, setIsUsersModulesModalOpen] = useState<boolean>(false)
    const [isUsersLevelsModalOpen, setIsUsersLevelsModalOpen] = useState<boolean>(false)

    const [mapName, setMapName] = useState<string>("")
    const [moduleName, setModuleName] = useState<string>("")
    const [levelName, setLevelName] = useState<string>("")

    // Загрузка карт модулей
    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[mapMenuStore.currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules()))
    }, []);

    // Загрузка списка сотрудников
    useEffect(() => {
        axios.get("http://localhost:8000/employees/").then((response) => {
            superUserStore.setAllEmployees(response.data)
        })
    }, []);

    const handleOnClickChangeIsModalEmployeesOpen = useCallback(() => {
        setIsUserListModalOpen(!isUsersListModalOpen)
    }, [isUsersListModalOpen])

    const handleOnClickChangeIsModalMapsOpen = useCallback(() => {
        setIsUsersMapsModalOpen(!isUsersMapsModalOpen)
    }, [isUsersMapsModalOpen])

    const handleOnChangeMapName = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setMapName(e.currentTarget.value)
    }, [])

    const handleOnClickOptionMap = useCallback((map: IMapType) => {
        mapMenuStore.chooseMap(map).then(() => refreshData())
    }, [])

    const handleOnClickDeleteMap = useCallback(() => {
        mapMenuStore.deleteMap().then(() => refreshDataAfterDelete())
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
        moduleMenuStore.chooseModule(module).then(() => refreshData())
    }, [])

    const handleOnClickDeleteModule = useCallback(() => {
        moduleMenuStore.deleteModule().then(() => refreshDataAfterDelete())
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
        levelStore.chooseLevel(level).then(() => refreshData())
    }, [])

    const handleOnClickDeleteLevel = useCallback(() => {
        levelStore.deleteLevel().then(() => refreshDataAfterDelete())
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
            if (mapMenuStore.choosedMap !== null && mapMenuStore.availableMaps.length !== 0) {
                moduleMenuStore.fetchModules().then(() => {
                    if (moduleMenuStore.choosedModule !== null || moduleMenuStore.availableModules.length !== 0) {
                        levelStore.fetchLevels().then()
                    }
                })
            }
        })
    }

    const refreshDataAfterDelete = () => {
        mapMenuStore.fetchAvailableMaps().then(() => moduleMenuStore.fetchModules().then(() => levelStore.fetchLevels().then()))
    }

    return (
        <div>
            {
                isUsersListModalOpen
                    ? <ModalWindow
                        onClose={handleOnClickChangeIsModalEmployeesOpen}
                        body={<UsersListModalBody employees={superUserStore.allEmployees}/>}
                    />
                    : null
            }

            {isUsersMapsModalOpen
                ? <ModalWindow
                    onClose={handleOnClickChangeIsModalMapsOpen}
                    body={<MapsListModalBody maps={mapMenuStore.availableMaps} chooseMap={mapMenuStore.chooseMap}/>}
                />
                : null
            }

            <CustomButton text="Открыть список карт" handleOnClick={handleOnClickChangeIsModalMapsOpen}/>

            <CustomButton
                className="users-list__btn"
                handleOnClick={handleOnClickChangeIsModalEmployeesOpen}
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

            <br/>

            <CustomButton text="ВЫЙТИ" handleOnClick={logOut}/>
        </div>
    );
});

export default SuperUserMap;
