import React from 'react';
import {RouteType} from "../types/RouteType.ts";
import WelcomePage from "../components/welcomePage/WelcomePage.tsx";
import {Route, Routes} from "react-router-dom";
import Authentication from "../components/authentication/Authentication.tsx";
import MapMenu from "../components/MapMenu/MapMenu.tsx";
import authStore from "../store/authStore.ts";
import {observer} from "mobx-react-lite";

const AppRouter: React.FC = observer(() => {
    // const [isUserAuthorized, setUserAuthorized] = useState<boolean>(false);

    const publicRoutes: RouteType[] = [
        {
            id: "1",
            path: '/',
            element: <WelcomePage/>
        },
        {
            id: "2",
            path: '/authentication',
            element: <Authentication/>
        }
    ]

    const privateRoutes: RouteType[] = [
        {
            id: "3",
            path: '/map',
            element: <MapMenu/>
        }
    ]

    // Здесь будет логика авторизации пользователя


    return (
        <div>
            {
                authStore.isUserAuthorized
                    ? <Routes>{privateRoutes.map(({path, element, id}) =>
                        <Route path={path} element={element} key={id}/>)} </Routes>
                    : <Routes>{publicRoutes.map(({path, element, id}) =>
                        <Route path={path} element={element} key={id}/>)} </Routes>
            }
        </div>
    );
})


export default AppRouter;
