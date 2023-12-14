import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";

import './../../styles/welcomePage.scss'

import Starfield from "react-starfield";

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()

    const handleOnClickToNavigate = useCallback(() => {
        navigateTo("/login")
    }, [navigateTo])

    return (
        <div className="welcome-page">
            <Starfield
                starCount={1000}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
            />
            <h1>ADAPTIFY</h1>
            <h2>WELCOME PAGE</h2>
            <CustomButton
                className="navigate_to_auth__btn"
                handleOnClick={handleOnClickToNavigate}
                text="Авторизоваться"
            />
        </div>
    );
};

export default WelcomePage;
