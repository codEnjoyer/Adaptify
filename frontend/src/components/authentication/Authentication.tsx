import React, {useCallback} from 'react';
import './../../styles/authentication.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import {useNavigate} from "react-router-dom";
import AuthForm from "./AuthForm.tsx";
import {observer} from "mobx-react-lite";

const Authentication: React.FC = observer(() => {
    const navigate = useNavigate()
    const handleOnClickBackToWelcomePage = useCallback(() => {
        navigate("/")
    }, [navigate])

    return (
        <div className="auth-page">
            <AuthForm/>
            <CustomButton
                additionalClassName="back-to-welcome-page__btn"
                text="Вернуться обратно"
                handleOnClick={handleOnClickBackToWelcomePage}
            />
        </div>
    );
});

export default Authentication;
