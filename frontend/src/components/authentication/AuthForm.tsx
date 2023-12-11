import React, {useCallback, useState} from 'react';

import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";

import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";

import {observer} from "mobx-react-lite";

import rulesValidation from "../../utils/auth.ts";
import authStore from "../../store/authStore.ts";

const AuthForm: React.FC = observer(() => {
    const navigateTo = useNavigate()
    const {register, handleSubmit} = useForm()

    const [isPasswordShows, setIsPasswordShows] = useState(false)

    const handleOnChangeIsPasswordShows = useCallback(() => {
        setIsPasswordShows(!isPasswordShows)
    }, [isPasswordShows])

    const onHandleSubmit = useCallback(({login, password}) => {
        authStore.signIn(login, password).then(() => navigateTo('/map'))
    }, [navigateTo])

    return (
        <form className="auth__form" onSubmit={handleSubmit((data) => onHandleSubmit(data))}>
            <h2 className="auth-form-title">ВХОД</h2>
            <fieldset className="auth-fields">
                <CustomInput
                    type="email"
                    register={register}
                    name={rulesValidation.login.fieldName}
                    validateRules={rulesValidation.login.rules}
                    autoFocus={true}
                    placeholder="Логин"
                />
                <CustomInput
                    type={isPasswordShows ? "text" : "password"}
                    register={register}
                    name={rulesValidation.password.fieldName}
                    validateRules={rulesValidation.password.rules}
                    placeholder="Пароль"
                />
            </fieldset>
            <CustomCheckbox
                text="Показать пароль"
                id="is-remember"
                additionalClassName="is-remember-password__checkbox"
                handleOnChange={handleOnChangeIsPasswordShows}
                isChecked={isPasswordShows}
            />
            <input type="submit" className="auth__btn" value="ВОЙТИ"/>
        </form>
    );
});

export default AuthForm;
