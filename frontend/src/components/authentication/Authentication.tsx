import React, {useState} from 'react';
import './../../styles/authentication.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";
import authStore from "../../store/authStore.ts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const Authentication: React.FC = observer(() => {
    const navigateTo = useNavigate()

    const [isPasswordShows, setIsPasswordShow] = useState(false)
    const changeShowPassword = () => {
        setIsPasswordShow(!isPasswordShows)
    }

    return (
        <div className="auth-page">
            <form className="auth__form">
                <h2 className="auth-form-title">АВТОРИЗАЦИЯ</h2>
                <fieldset className="auth-fields">
                    <div className="auth-data__field">
                        <input type="email" className="login__input"
                               placeholder="Логин"
                               value={authStore.userLogin}
                               onChange={(e) => authStore.changeUserLogin(e.target.value)}
                               autoFocus={true}
                        />
                    </div>
                    <div className="auth-data__field">
                        {isPasswordShows
                            ? <input type="text" className="password__input" value={authStore.userPassword}
                                     onChange={(e) => authStore.changeUserPassword(e.target.value)}
                                     placeholder="Пароль"/>
                            : <input type="password" className="password__input" value={authStore.userPassword}
                                     onChange={(e) => authStore.changeUserPassword(e.target.value)}
                                     placeholder="Пароль"/>}

                    </div>
                </fieldset>
                <CustomCheckbox text="Показать пароль" id="is-remember"
                                additionalClassName="is-remember-password__checkbox"
                                handleOnChange={changeShowPassword}/>
                <CustomButton additionalClassName="auth__btn" text="ВОЙТИ111" handleOnClick={() => {
                    authStore.signIn().then(() => navigateTo('/map'))
                }}/>
                <CustomButton additionalClassName="auth__btn" text="ЗАРЕГИСТРИРОВАТЬСЯ"
                              handleOnClick={authStore.signUp}/>
            </form>
            <CustomButton text="Вернуться обратно" handleOnClick={() => navigateTo('/')}></CustomButton>
        </div>
    );
});

export default Authentication;
