import React, {useEffect, useState} from 'react';

import Coins from "../UIMapMenu/Coins.tsx";
import ChooseModuleWindow from "../UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "../UIMapMenu/UserProfile/UserProfile.tsx";
import CustomProgressBar from "../../../UIComponents/CustomProgressBar/CustomProgressBar.tsx";
import Level from "../UIMapMenu/Level/Level.tsx";


import {observer} from "mobx-react-lite";

import moduleMenuStore from "../../../store/moduleMenuStore.ts";
import mapMenuStore from "../../../store/mapMenuStore.ts"
import levelStore from "../../../store/levelStore.ts";

import {IUserType} from "../../../types/UserType.ts";
import axios from "axios";
import Starfield from "react-starfield";
import {IEmployeeType} from "../../../types/EmployeeType.ts";


interface IEmployeeMap {
    user?: IUserType,
    logOut: () => void
}

const EmployeeMap: React.FC<IEmployeeMap> = observer(({user, logOut}) => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [employee, setEmployee] = useState<IEmployeeType>()

    useEffect(() => {
        // console.log(user)
        axios.get("http://localhost:8000/employees").then((r) => {
            r.data.map((employee: IEmployeeType) => {
                if (user?.id === employee.user.id) {
                    setEmployee(employee)
                    setIsLoading(false)
                }
            })
        })
    }, []);

    useEffect(() => {
        mapMenuStore.fetchAvailableMaps().then(() => {
            mapMenuStore.fetchMapById(mapMenuStore.availableMaps[0].id).then(() => {
                moduleMenuStore.fetchModules().then(() => {
                    moduleMenuStore.fetchModuleById(moduleMenuStore.availableModules[0].id).then(() => {
                        levelStore.fetchLevels().then(() => {
                        })
                    })
                }).catch(() => alert("Нет доступных модулей для данной карты"))
            })
        }).catch(() => alert("Нет доступных карт для данного пользователя"))
    }, []);

    return (
        isLoading ? (
                <Starfield
                    starCount={1000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.05}
                    backgroundColor="black"
                />
            )
            :
            (
                <div className="employee-interface">
                    <Starfield
                        starCount={1000}
                        starColor={[255, 255, 255]}
                        speedFactor={0.05}
                        backgroundColor="black"
                    />
                    <Coins
                        coins={employee ? employee.coins : 0}
                        additionalClassname="coins"
                    />
                    <ChooseModuleWindow
                        moduleName={moduleMenuStore.choosedModule?.title.toUpperCase()}
                    />
                    <UserProfile
                        logOut={logOut}
                        employee={employee}
                    />
                    <CustomProgressBar
                        className="progress-bar-wrapper"
                        progress={54}
                    />
                    <div className="geolocations">
                        <div className="geolocations__wrapper">
                            {levelStore.availableLevels.map((level, index) => {
                                return (
                                    <Level
                                        key={level.id}
                                        id={(index + 1).toString()}
                                        level={level}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
    );
});

export default EmployeeMap;
