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
    return (
        <div>
            <Coins coins={100} additionalClassname="coins"/>
            <ChooseModuleWindow/>
            <UserProfile/>
            <br/>
            <div className="geolocations">
                <div className="geolocations__wrapper">
                    <div className="geolocation-1"><Geolocation/></div>
                    <div className="geolocation-2"><Geolocation/></div>
                    <div className="geolocation-3"><Geolocation/></div>
                </div>
            </div>
            <CustomButton text="Выйти" handleOnClick={onHandleSignOut}/>
        </div>
    );
};

export default MapMenu;
