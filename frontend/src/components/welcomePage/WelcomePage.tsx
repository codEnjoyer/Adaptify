import React from 'react';
import {useNavigate} from "react-router-dom";
import './../../styles/welcomePage.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()

    return (
        <div className="welcome-page">
            <h1>ADAPTIFY</h1>
            <h2>WELCOME PAGE</h2>
            <CustomButton
                additionalClassName="navigate_to_auth__btn"
                handleOnClick={() => navigateTo("/login")}
                text="Авторизоваться"/>
        </div>
    );
};

export default WelcomePage;
