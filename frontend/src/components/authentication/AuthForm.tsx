import React, {useCallback, useState} from 'react';

import CustomInput from "../../UIComponents/customInput/CustomInput.tsx";
import CustomCheckbox from "../../UIComponents/customCheckbox/CustomCheckbox.tsx";

import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form";

import rulesValidation from "../../utils/auth.ts";

const AuthForm: React.FC = () => {
    const navigateTo = useNavigate()
    const {register, handleSubmit} = useForm()

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordShows, setIsPasswordShows] = useState(false)

    const handleOnChangeIsPasswordShows = useCallback(() => {
        setIsPasswordShows(!isPasswordShows)
    }, [isPasswordShows])

    return (
        <form className="auth__form" onSubmit={handleSubmit((data) => {
            console.log(data)
        })}>
            <h2 className="auth-form-title">ВХОД</h2>
            <fieldset className="auth-fields">
                <CustomInput
                    type="email"
                    register={register}
                    name={rulesValidation.login.fieldName}
                    validateRules={rulesValidation.login.rules}
                    autoFocus={true}
                    placeholder="Логин"
                    required={true}
                    value={login}
                    changeValue={setLogin}
                />
                <CustomInput
                    type={isPasswordShows ? "text" : "password"}
                    register={register}
                    name={rulesValidation.password.fieldName}
                    validateRules={rulesValidation.password.rules}
                    placeholder="Пароль"
                    required={true}
                    value={password}
                    changeValue={setPassword}
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
};

export default AuthForm;
