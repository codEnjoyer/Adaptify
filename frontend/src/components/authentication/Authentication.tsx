import React, {useState} from 'react';
import './../../styles/authentication.scss'
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";
import authStore from "../../store/authStore.ts";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";

const Authentication: React.FC = observer(() => {
    const navigateTo = useNavigate()

    const [isPasswordShows, setIsPasswordShow] = useState(false)

    const changeShowPassword = () => {
        setIsPasswordShow(!isPasswordShows)
    }


    return (
        <div className="auth-page">
            <form className="auth__form">
                <h2 className="auth-form-title">ВХОД</h2>
                <fieldset className="auth-fields">
                    <CustomInput type="email" value={authStore.userLogin} handleOnChange={(e) => {
                        authStore.changeUserLogin(e)
                        authStore.changeUserEmail(e)
                    }}
                                 autoFocus={true} placeholder="Логин"/>
                    <div className="auth-data__field">
                        <CustomInput type={isPasswordShows ? "text" : "password"} placeholder="Пароль"
                                     value={authStore.userPassword}
                                     handleOnChange={(e) => authStore.changeUserPassword(e)}/>
                    </div>
                </fieldset>
                <CustomCheckbox text="Показать пароль" id="is-remember"
                                additionalClassName="is-remember-password__checkbox"
                                handleOnChange={changeShowPassword}/>
                <CustomButton additionalClassName="auth__btn" text="ВОЙТИ" handleOnClick={() => {
                    authStore.signIn().then(() => navigateTo('/map'))
                }}/>
                {/*<CustomButton additionalClassName="auth__btn" text="ЗАРЕГИСТРИРОВАТЬСЯ"*/}
                {/*              handleOnClick={() => authStore.signUp()}/>*/}
            </form>
            <CustomButton additionalClassName="back-to-welcome-page__btn" text="Вернуться обратно"
                          handleOnClick={() => navigateTo('/')}></CustomButton>
        </div>
    );
});

export default Authentication;
