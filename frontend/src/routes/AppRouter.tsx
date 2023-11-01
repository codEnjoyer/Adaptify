import React from 'react';
import {RouteType} from "../types/RouteType.ts";
import WelcomePage from "../components/welcomePage/WelcomePage.tsx";
import {Route, Routes} from "react-router-dom";
import Authentication from "../components/authentication/Authentication.tsx";

const AppRouter: React.FC = () => {
    const publicRoutes: RouteType[] = [
        {
            id: "1",
            path: '/',
            element: <WelcomePage/>
        },
        {
            id: "2",
            path: 'authentication',
            element: <Authentication/>
        }
    ]
    return (
        <div>
            <Routes>
                {publicRoutes.map(({path, element, id}) => <Route path={path} element={element} id={id}/>)}
            </Routes>
        </div>
    );
};

export default AppRouter;
