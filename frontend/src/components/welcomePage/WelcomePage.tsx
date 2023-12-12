import React from 'react';
import {useNavigate} from "react-router-dom";
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";

import './../../styles/welcomePage.scss'

import Starfield from "react-starfield";

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()

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
                additionalClassName="navigate_to_auth__btn"
                handleOnClick={() => navigateTo("/login")}
                text="Авторизоваться"
            />
        </div>
    );
};

export default WelcomePage;
