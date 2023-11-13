import React from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";

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
            <CustomButton text="Выйти" handleOnClick={onHandleSignOut}/>
            <UserProfile/>
        </div>
    );
};

export default MapMenu;
