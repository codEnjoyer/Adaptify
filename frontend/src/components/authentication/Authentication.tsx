import React from 'react';
import {useNavigate} from "react-router-dom";
import './../../styles/authentication.scss'

const Authentication: React.FC = () => {
    const navigateTo = useNavigate()
    return (
        <div className="auth_page">
            <form className="auth__form">
                <h2 className="auth_form_title">АВТОРИЗАЦИЯ</h2>
                <div className="auth_fields">
                    <div className="auth_data__field">
                        <input type="email" className="login__input" placeholder="Логин"/>
                    </div>
                    <div className="auth_data__field">
                        <input type="password" className="password__input" placeholder="Пароль"/>
                    </div>
                </div>
                <button className="auth__btn">ВОЙТИ</button>
            </form>
            <button onClick={() => navigateTo("/")}>Вернуться обратно</button>
        </div>
    );
};

export default Authentication;
