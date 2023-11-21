import React from 'react';
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {IRouteType} from "../types/RouteType.ts";
import WelcomePage from "../components/welcomePage/WelcomePage.tsx";
import Authentication from "../components/authentication/Authentication.tsx";
import MapMenu from "../components/mapMenu/MapMenu.tsx";
import authStore from "../store/authStore.ts";
import {observer} from "mobx-react-lite";

const AppRouter: React.FC = observer(() => {
    const publicRoutes: IRouteType[] = [
        {
            id: 1,
            element: <WelcomePage/>,
            path: "/"
        },
        {
            id: 2,
            element: <Authentication/>,
            path: "/login",
        }
    ]

    const privateRoutes: IRouteType[] = [
        {
            id: 2,
            element: <Authentication/>,
            path: "/login",
        },
        {
            id: 3,
            element: <MapMenu/>,
            path: "/map"
        }
    ]

    const location = useLocation()

    return (
        authStore.isUserAuthorized ?
            (
                privateRoutes.findIndex(comp => comp.path === location.pathname) !== -1
                    ?
                    <Routes>
                        {
                            privateRoutes.map(({path, element}, index) =>
                                <Route path={path} element={element} key={index}/>
                            )
                        }
                    </Routes>
                    :
                    <Navigate to="/"/>

            )
            :
            (
                publicRoutes.findIndex(comp => comp.path === location.pathname) !== -1
                    ?
                    <Routes>
                        {
                            publicRoutes.map(({path, element}, index) =>
                                <Route path={path} element={element} key={index}/>
                            )
                        }
                    </Routes>
                    :
                    <Navigate to="/login"/>
            )
    );
})


export default AppRouter;
