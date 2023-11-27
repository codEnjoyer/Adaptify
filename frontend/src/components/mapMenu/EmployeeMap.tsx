import React from 'react';
import Coins from "./UIMapMenu/Coins.tsx";
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import UserProfile from "./UIMapMenu/UserProfile/UserProfile.tsx";
import Level from "./UIMapMenu/Level/Level.tsx";
import {IUserType} from "../../types/UserType.ts";
import {observer} from "mobx-react-lite";
import moduleMenuStore from "../../store/moduleMenuStore.ts";

interface IEmployeeMap {
    user?: IUserType,
    formattedDate: string
}

const EmployeeMap: React.FC<IEmployeeMap> = observer(({user, formattedDate}) => {
    return (
        <div className="employee-interface">
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow moduleName={moduleMenuStore.currentModule?.title}/>
            <UserProfile user={user} formattedDate={formattedDate}/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    {mapMenuStore.availableLevels.map((level, index) => {
                        return <Level id={(index + 1).toString()} key={level.id} title={level.title}
                                      theoryUnits={level.theoryUnits} taskUnits={level.taskUnits}/>
                    })}
                </div>
            </div>
        </div>
    );
});

export default EmployeeMap;
