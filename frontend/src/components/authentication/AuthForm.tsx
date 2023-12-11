import React, {useCallback, useState} from 'react';

import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";

import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";

import {observer} from "mobx-react-lite";

import authStore from "../../store/authStore.ts";
import auth from "../../utils/auth.ts";

export type FormValues = {
    login: string,
    password: string,
}

const AuthForm: React.FC = observer(() => {
    const navigateTo = useNavigate()
    const {register, handleSubmit} = useForm<FormValues>()

    const [isPasswordShows, setIsPasswordShows] = useState(false)

    const handleOnChangeIsPasswordShows = useCallback(() => {
        setIsPasswordShows(!isPasswordShows)
    }, [isPasswordShows])

    const onHandleSubmit = useCallback((data: {login: string, password: string}) => {
        authStore.signIn(data.login, data.password).then(() => navigateTo('/map'))
        console.log(data.login, data.password)
    }, [navigateTo])

    return (
        <form
            className="auth__form"
            onSubmit={handleSubmit((data: FormValues) => onHandleSubmit(data))}
        >
            <h2 className="auth-form-title">ВХОД</h2>

            <fieldset className="auth-fields">
                <CustomInput
                    type="text"
                    register={register}
                    name="login"
                    validateRules={auth.login.rules}
                />

                <CustomInput
                    type={isPasswordShows ? "text" : "password"}
                    register={register}
                    name={auth.password.fieldName}
                    validateRules={auth.password.rules}
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
