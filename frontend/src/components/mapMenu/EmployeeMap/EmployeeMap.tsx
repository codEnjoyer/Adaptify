import React, {useEffect} from 'react';

import Coins from "../UIMapMenu/Coins.tsx";
import ChooseModuleWindow from "../UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "../UIMapMenu/UserProfile/UserProfile.tsx";
import CustomProgressBar from "../../../UIComponents/CustomProgressBar/CustomProgressBar.tsx";
import Level from "../UIMapMenu/Level/Level.tsx";


import {observer} from "mobx-react-lite";

import moduleMenuStore from "../../../store/moduleMenuStore.ts";
import mapMenuStore from "../../../store/mapMenuStore.ts"

import {IUserType} from "../../../types/UserType.ts";
import levelStore from "../../../store/levelStore.ts";


interface IEmployeeMap {
    user?: IUserType,
    formattedDate: string,
    logOut: () => void
}

const EmployeeMap: React.FC<IEmployeeMap> = observer(({user, formattedDate, logOut}) => {
    useEffect(() => {
        mapMenuStore.fetchAvailableMaps().then(() => {
            mapMenuStore.fetchMapById(mapMenuStore.availableMaps[0].id).then(() => {
                moduleMenuStore.fetchModules().then(() => {
                    moduleMenuStore.fetchModuleById(moduleMenuStore.availableModules[0].id).then(() => {
                        levelStore.fetchLevels().then(() => {

                        }).catch(() => alert("Нет доступных уровней для данного модуля"))
                    })
                }).catch(() => alert("Нет доступных модулей для данной карты"))
            })
        }).catch(() => alert("Нет доступных карт для данного пользователя"))
    }, []);

    return (
        <div className="employee-interface">
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow moduleName={moduleMenuStore.choosedModule?.title.toUpperCase()}/>
            <UserProfile logOut={logOut} user={user} formattedDate={formattedDate}/>
            <CustomProgressBar className="progress-bar-wrapper" progress={54}/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    {levelStore.availableLevels.map((level, index) => {
                        return <Level
                            id={(index + 1).toString()}
                            level={level}
                        />
                    })}
                </div>
            </div>
        </div>
    );
});

export default EmployeeMap;
