import React, {useEffect} from 'react';
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";
import Module from "./UIMapMenu/Level/Module.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";

const MapMenu: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!authStore.isUserAuthorized)
            navigate("/")

        mapMenuStore.fetchAvailableMaps().then(() => {
            mapMenuStore.fetchMapById(mapMenuStore.availableMaps[0].id).then(() => {
                mapMenuStore.setModulesMap(mapMenuStore?.mapMenu?.modules_ids)
                console.log(mapMenuStore.modulesMap.join(" "))
            })
        })
    }, [navigate])

    return (
        <div>
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow/>
            <UserProfile/>
            <br/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    {geolocations.map((geolocation) =>
                        <Module id={geolocation.id} level={geolocation.level} key={geolocation.id}/>)}
                </div>
            </div>
        </div>
    );
};

export default MapMenu;
