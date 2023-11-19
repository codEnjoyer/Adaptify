import React, {useEffect} from 'react';
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile.tsx";
import StarUnit from "./UIMapMenu/Level/StarUnit.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import {ILevelType} from "../../types/LevelType.ts";

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

    // const onHandleSignOut = () => {
    //     authStore.logOutUser().then()
    //     navigate('/')
    // }

    const geolocations: ILevelType[] = [
        {
            id: "1",
            levels: {
                levelName: "Уровень 1",
                title: "Собери помидорки",
                menu: [{
                    taskName: "test",
                    body: "Какая-то информация которая очень хорошо тебе поведает тайну о помидорках и ещё какая-то информация которая очень хорошо тебе поведает тайну о помидорках ",
                }]
            }
        },
        {
            id: "2",
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
            id: "3",
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
