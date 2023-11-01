import React from 'react';
import {useNavigate} from "react-router-dom";

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()

    return (
        <div>
            <h1>Adaptify</h1>
            <button onClick={() => navigateTo("/authentication")}>Авторизоваться</button>
        </div>
    );
};

export default WelcomePage;
