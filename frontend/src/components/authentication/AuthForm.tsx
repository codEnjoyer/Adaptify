import React, {FormEvent, useCallback, useState} from 'react';

import authStore from "../../store/authStore.ts";

import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";

import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";

const AuthForm: React.FC = () => {
    const navigateTo = useNavigate()
    const {register, handleSubmit} = useForm()

    const [isPasswordShows, setIsPasswordShows] = useState(false)

    const handleOnChangeIsPasswordShows = useCallback((event: FormEvent<HTMLInputElement>) => {
        setIsPasswordShows(!event.currentTarget.checked)
    }, [])

    return (
        <form className="auth__form" onSubmit={handleSubmit((data) => {
            console.log(data)
        })}>
            <h2 className="auth-form-title">ВХОД</h2>
            <fieldset className="auth-fields">
                <CustomInput
                    type="email"
                    register={register}
                    name={"userLogin"}
                    autoFocus={true}
                    placeholder="Логин"
                    required={true}
                />
                <CustomInput
                    type={isPasswordShows ? "text" : "password"}
                    register={register}
                    name={"userPassword"}
                    placeholder="Пароль"
                    required={true}
                />
            </fieldset>
            <CustomCheckbox
                text="Показать пароль"
                id="is-remember"
                additionalClassName="is-remember-password__checkbox"
                handleOnChange={handleOnChangeIsPasswordShows}
            />
            <input type="submit" className="auth__btn" value="ВОЙТИ"/>
        </form>
    );
};

export default AuthForm;
