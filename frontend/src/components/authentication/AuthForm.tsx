import React from 'react';
import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import authStore from "../../store/authStore.ts";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import {useNavigate} from "react-router-dom"
import {observer} from "mobx-react-lite";

const AuthForm: React.FC = observer(() => {
    const navigateTo = useNavigate()

    return (
        <form className="auth__form">
            <h2 className="auth-form-title">ВХОД</h2>
            <fieldset className="auth-fields">
                <CustomInput type="email" value={authStore.userLogin} autoFocus={true} placeholder="Логин"
                             handleOnChange={(e) => {
                                 authStore.changeUserLogin(e)
                                 authStore.changeUserEmail(e)
                             }}/>
                    <CustomInput
                        type={authStore.isPasswordShows ? "text" : "password"} placeholder="Пароль"
                        value={authStore.userPassword} handleOnChange={(e) => authStore.changeUserPassword(e)}/>
            </fieldset>
            <CustomCheckbox text="Показать пароль" id="is-remember"
                            additionalClassName="is-remember-password__checkbox"
                            handleOnChange={authStore.changeIsPasswordShows}/>
            <CustomButton additionalClassName="auth__btn" text="ВОЙТИ" handleOnClick={() => {
                authStore.signIn().then(() => navigateTo('/map'))
            }}/>
        </form>
    );
});

export default AuthForm;
