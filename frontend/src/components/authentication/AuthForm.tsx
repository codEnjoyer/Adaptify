import React, {useCallback, useState} from 'react';

import CustomInput from "../../UIComponents/customInput/CustomInput";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox";
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";

import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";

import {observer} from "mobx-react-lite";

import authStore from "../../store/authStore";
import auth from "../../utils/auth";

import Starfield from "react-starfield";

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

    const onHandleSubmit = useCallback((data: { login: string, password: string }) => {
        authStore.signIn(data.login, data.password).then(() => navigateTo('/map'))
        authStore.setUser(data.login)
    }, [])

    return (
        <div>
            <Starfield
                starCount={1000}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
                backgroundColor="black"
            />

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
                        placeholder="Логин"
                    />

                    <CustomInput
                        type={isPasswordShows ? "text" : "password"}
                        register={register}
                        name={auth.password.fieldName}
                        validateRules={auth.password.rules}
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

                <CustomButton
                    type="submit"
                    className="auth__btn"
                    text="ВОЙТИ"
                />
            </form>
        </div>
    );
});

export default AuthForm;
