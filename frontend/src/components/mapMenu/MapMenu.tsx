import React from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";
import Geolocation from "./UIMapMenu/UIChooseModule/Geolocation.tsx";

const MapMenu: React.FC = () => {
    const navigate = useNavigate()

    const onHandleSignOut = () => {
        authStore.signOutUser()
        navigate('/')
    }

    const geolocations = [
        {
            id: 1,
            level: {
                levelName: "Уровень 1",
                title: "Собери помидорки",
                body: "Я помидорка"
            }
        },
        {
            id: 2,
            level: {
                levelName: "Уровень 2",
                title: "Собери не помидорки",
                body: "Я уже не помидорка"
            }
        },
        {
            id: 3,
            level: {
                levelName: "Уровень 3",
                title: "Начни бить Никиту",
                body: "Я помидорка"
            }
        },

    ]

    return (
        <div>
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow/>
            <UserProfile/>
            <br/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    {geolocations.map((geolocation) => <Geolocation id={geolocation.id} level={geolocation.level}
                                                                    key={geolocation.id}/>)}
                </div>
            </div>
            <CustomButton text="Выйти" handleOnClick={onHandleSignOut}/>
        </div>
    );
};

export interface IModalLevelProps {
    levelName: string,
    title: string,
    body: string
}

export default MapMenu;
