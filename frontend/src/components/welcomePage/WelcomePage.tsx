import React from 'react';
import {useNavigate} from "react-router-dom";
import './../../styles/welcomePage.scss'

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()

    return (
        <div className="welcome-page">
            <h1>Adaptify</h1>
            <h2>Welcome page</h2>
            <button className="navigate_to_auth__btn" onClick={() => navigateTo("/authentication")}>Авторизоваться</button>
        </div>
    );
};

export default WelcomePage;
