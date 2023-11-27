import React from 'react';
import './../../styles/authentication.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import AuthForm from "./AuthForm.tsx";

const Authentication: React.FC = () => {
    const navigateTo = useNavigate()

    return (
        <div className="auth-page">
            <AuthForm/>
            <CustomButton additionalClassName="back-to-welcome-page__btn" text="Вернуться обратно"
                          handleOnClick={() => navigateTo('/')}></CustomButton>
        </div>
    );
};

export default Authentication;
