import React, {useCallback, useEffect, useState} from 'react';

import CustomButton from "../../../UIComponents/customButton/CustomButton.tsx";
import ModalWindow from "../../../UIComponents/modalWindow/ModalWindow.tsx";
import UsersListModalBody from "./UsersListModalBody.tsx";

import {observer} from "mobx-react-lite";
import mapMenuStore from "../../../store/mapMenuStore.ts";
import moduleMenuStore from "../../../store/moduleMenuStore.ts";
import levelStore from "../../../store/levelStore.ts";
import superUserStore from "../../../store/superUserStore.ts";
import axios from "axios";
import MapsListModalBody from "./superUserControlPanel/MapsListModalBody.tsx";

interface ISuperUserMapProps {
    logOut: () => void
}

const SuperUserMap: React.FC<ISuperUserMapProps> = observer(({logOut}) => {
    const [isUsersListModalOpen, setIsUserListModalOpen] = useState<boolean>(false)

    const [isUsersMapsModalOpen, setIsUsersMapsModalOpen] = useState<boolean>(false)

    // Загрузка карт модулей
    useEffect(() => {
        mapMenuStore.fetchAvailableMaps()
            .then(() => mapMenuStore.fetchMapById(mapMenuStore.availableMaps[mapMenuStore.currentMapIndex].id)
                .then(() => moduleMenuStore.fetchModules().then(() => levelStore.fetchLevels())))
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
                    body={<MapsListModalBody
                        maps={mapMenuStore.availableMaps}
                        chooseMap={mapMenuStore.chooseMap}
                        modules={moduleMenuStore.availableModules}
                        chooseModule={moduleMenuStore.chooseModule}
                        levels={levelStore.availableLevels}
                        chooseLevel={levelStore.chooseLevel}
                    />}
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

            <br/>

            <CustomButton text="ВЫЙТИ" handleOnClick={logOut}/>
        </div>
    );
});

export default SuperUserMap;
