import React from 'react';
import "./customInput.scss"
import {RegisterOptions, UseFormRegister} from "react-hook-form";
import {FormValues} from "../../components/authentication/AuthForm.tsx";


interface IPropTypes {
    placeholder?: string,
    type: string,
    name?: "login" | "password",
    className?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    validateRules?: RegisterOptions,
    width?: string,
    height?: string,
    defaultValue?: string,
    register?: UseFormRegister<FormValues>,
    required?: boolean,
    value?: string,
}

const CustomInput: React.FC<IPropTypes> =
    ({
         placeholder,
         type,
         name,
         className,
         autoFocus,
         disabled,
         width,
         height,
         defaultValue,
         register,
         validateRules,
         ...inputProps
     }) => {
        return (
            <div className="custom-input" style={{width: width, height: height}}>
                <label htmlFor={name}></label>
                <input
                    id={name}
                    type={type}
                    className={className}
                    placeholder={placeholder !== undefined ? placeholder : ""}
                    autoFocus={autoFocus !== undefined ? autoFocus : false}
                    disabled={disabled !== undefined ? disabled : false}
                    style={{height: height}}
                    defaultValue={defaultValue}
                    {...register !== undefined && name !== undefined ? {...register(name, validateRules)} : ""}
                    {...inputProps}
                />
                {/*{error.message && <span className="custom-input__error">{error.message}</span>}*/}
            </div>
        );
    };

export default CustomInput;
