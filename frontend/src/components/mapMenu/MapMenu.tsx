import React, {useEffect} from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";
import {GeolocationType} from "../../types/GeolocationType.ts";
import StarUnit from "./UIMapMenu/Level/StarUnit.tsx";

const MapMenu: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!authStore.isUserAuthorized)
            navigate("/")
    }, [navigate])

    const onHandleSignOut = () => {
        authStore.logOutUser().then()
        navigate('/')
    }

    const geolocations: GeolocationType[] = [
        {
            id: 1,
            level: {
                levelName: "Уровень 1",
                title: "Собери помидорки",
                menu: [{
                    taskName: "test",
                    body: "Какая-то информация которая очень хорошо тебе поведает тайну о помидорках и ещё какая-то информация которая очень хорошо тебе поведает тайну о помидорках ",
                }]
            }
        },
        {
            id: 2,
            level: {
                levelName: "Уровень 2",
                title: "Собери не помидорки",
                menu: [{
                    taskName: "theory",
                    body: "Я уже не помидорка"
                }]
            }
        },
        {
            id: 3,
            level: {
                levelName: "Уровень 3",
                title: "Начни текст",
                menu: [
                    {
                        taskName: "video",
                        body: "Я помидорка"
                    },
                    {
                        taskName: "test",
                        body: "БУБУБУБУ"
                    }
                ]
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
                    {geolocations.map((geolocation) =>
                        <StarUnit id={geolocation.id} level={geolocation.level} key={geolocation.id}/>)}
                </div>
            </div>
            {/*<CustomButton text="Выйти" handleOnClick={onHandleSignOut}/>*/}
        </div>
    );
};

export default MapMenu;
