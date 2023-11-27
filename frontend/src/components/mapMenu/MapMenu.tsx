import React, {useEffect, useState} from 'react';
import authStore from "../../store/authStore.ts";
import {useNavigate} from "react-router-dom";
import './../../styles/mapMenu.scss'
import mapMenuStore from "../../store/mapMenuStore.ts";
import {observer} from "mobx-react-lite";
import {IUserType} from "../../types/UserType.ts";
import axios from "axios";
import EmployeeMap from "./EmployeeMap.tsx";
import SuperUserMap from "./SuperUserMap.tsx";

const MapMenu: React.FC = observer(() => {
    const navigate = useNavigate()

    const [user, setUser] = useState<IUserType>()
    const [formattedDate, setFormattedDate] = useState("")


    useEffect(() => {
        axios.get("http://localhost:8000/users/").then((response) => {
            response.data.map((user: IUserType) => {
                if (user.username === authStore.userLogin) {
                    setUser(user)
                }
            })

            mapMenuStore.setAllUsers(response.data)


            if (user) {
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
            {!user?.is_superuser
                ? <SuperUserMap allUsers={mapMenuStore.allUsers}/>
                : <EmployeeMap user={user} formattedDate={formattedDate}/>
            }
        </div>
    );
});

export default MapMenu;
