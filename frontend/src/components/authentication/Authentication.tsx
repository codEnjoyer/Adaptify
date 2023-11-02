import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './../../styles/authentication.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";

const Authentication: React.FC = () => {
    const navigateTo = useNavigate()

    const [isPasswordShows, setIsPasswordShow] = useState(false)
    const changeShowPassword = () => {
        setIsPasswordShow(!isPasswordShows)
    }

    return (
        <div className="auth_page">
            <form className="auth__form">
                <h2 className="auth_form_title">АВТОРИЗАЦИЯ</h2>
                <div className="auth_fields">
                    <div className="auth_data__field">
                        <input type="email" className="login__input" placeholder="Логин"/>
                    </div>
                    <div className="auth_data__field">
                        {isPasswordShows
                            ? <input type="text" className="password__input" placeholder="Пароль"/>
                            : <input type="password" className="password__input" placeholder="Пароль"/>}

                    </div>
                </div>
                <CustomCheckbox text="Показать пароль" id="is-remember"
                                additionalClassName="is-remember-password__checkbox"
                                handleOnChange={changeShowPassword}/>
                <CustomButton additionalClassName="auth__btn" text="ВОЙТИ" handleOnClick={() => null}/>
            </form>
            <CustomButton text="Вернуться обратно" handleOnClick={() => navigateTo('/')}></CustomButton>
        </div>
    );
};

export default Authentication;
