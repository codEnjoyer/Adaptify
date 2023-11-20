import React, {useEffect} from 'react';
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";
import Module from "./UIMapMenu/Level/Module.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import {observer} from "mobx-react-lite";

const MapMenu: React.FC = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!authStore.isUserAuthorized)
            navigate("/")

        mapMenuStore.fetchAvailableMaps().then(() => {
            mapMenuStore.fetchMapById(mapMenuStore.availableMaps[0].id).then(() => {
                mapMenuStore.fetchModules().then(() => {
                    mapMenuStore.fetchModuleById(mapMenuStore.availableModules[0].id).then(() => {
                        mapMenuStore.fetchLevels().then(() => {
                        })
                    })
                })
            })
        })
    }, [navigate])

    return (
        <div>
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow moduleName={mapMenuStore.currentModule?.title}/>
            <UserProfile/>
            <button onClick={() => mapMenuStore.addQuestionToTaskUnit()}>asd</button>
            <br/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    {mapMenuStore.availableLevels.map((level, index) => {
                        return <Module id={(index + 1).toString()} key={level.id} title={level.title}
                                       theoryUnits={level.theoryUnits} taskUnits={level.taskUnits}/>
                    })}
                </div>
            </div>
        </div>
    );
});

export default MapMenu;
