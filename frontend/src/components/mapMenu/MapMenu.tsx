import React, {useEffect, useState} from 'react';
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import Coins from "./UIMapMenu/Coins.tsx";
import './../../styles/mapMenu.scss'
import ChooseModuleWindow from "./UIMapMenu/ChooseModuleWindow.tsx";
import UserProfile from "./UIMapMenu/UserProfile/UserProfile.tsx";
import Module from "./UIMapMenu/Level/Module.tsx";
import mapMenuStore from "../../store/mapMenuStore.ts";
import {observer} from "mobx-react-lite";
import {IUserType} from "../../types/UserType.ts";
import axios from "axios";

const MapMenu: React.FC = observer(() => {
    const navigate = useNavigate()

    const [user, setUser] = useState<IUserType>()
    const [formattedDate, setFormattedDate] = useState("")
    const [allUsers, setAllUsers] = useState<IUserType[]>()

    useEffect(() => {
        axios.get("http://localhost:8000/users/").then((response) => {
            response.data.map((user: IUserType) => {
                if (user.username === authStore.userLogin) {
                    setUser(user)
                }
            })

            setAllUsers(response.data)

            if (user) {
                console.log(user)
                const date = new Date(Date.parse(user!.registered_at))
                setFormattedDate(`${date.getDay()}.${date.getMonth()}.${date.getUTCFullYear()}`)
            }
        })
    }, [])

    useEffect(() => {
        if (!authStore.isUserAuthorized)
            navigate("/")

        mapMenuStore.fetchAvailableMaps().then(() => {
            mapMenuStore.fetchMapById(mapMenuStore.availableMaps[0].id).then(() => {
                mapMenuStore.fetchModules().then(() => {
                    mapMenuStore.fetchModuleById(mapMenuStore.availableModules[0].id).then(() => {
                        mapMenuStore.fetchLevels().then(() => {

                        }).catch(() => alert("Нет доступных уровней для данного модуля"))
                    })
                }).catch(() => alert("Нет доступных модулей для данной карты"))
            })
        }).catch(() => alert("Нет доступных карт для данного пользователя"))
    }, [navigate])

    return (
        <div>
            {user?.is_superuser
                ? (
                    <div>
                        <select>
                            {allUsers?.map((user) =>
                                <option key={user.username} value={user.username}>{user.username}</option>)}
                        </select>
                    </div>
                ) : (
                    <div className="employee-interface">
                        <Coins coins={100} additionalClassname="coins"/>
                        <ChooseModuleWindow moduleName={mapMenuStore.currentModule?.title}/>
                        <UserProfile user={user} formattedDate={formattedDate}/>
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
                )}

        </div>
    );
});

export default MapMenu;
