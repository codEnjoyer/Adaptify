import React from 'react';
import "./customInput.scss"
import {FieldValues, RegisterOptions, UseFormRegister} from "react-hook-form";

interface IPropTypes {
    placeholder?: string,
    type: string,
    name: string,
    className?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    validateRules: RegisterOptions,
    width?: string,
    height?: string,
    defaultValue?: string,
    register: UseFormRegister<FieldValues>,
    required?: boolean,
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
                    {...register(name, validateRules)}
                    {...inputProps}
                />
                {/*{error.message && <span className="custom-input__error">{error.message}</span>}*/}
            </div>
        );
    };

export default CustomInput;
