import React from 'react';
import "./customInput.scss"
import {FieldValues, UseFormRegister} from "react-hook-form";

interface IPropTypes {
    placeholder?: string,
    type: string,
    name: string,
    className?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    width?: string,
    height?: string,
    defaultValue?: string,
    register: UseFormRegister<FieldValues>,
    required: boolean
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
         required
     }) => {
        return (
            <div className="custom-input" style={{width: width, height: height}}>
                <input
                    type={type}
                    className={className}
                    placeholder={placeholder !== undefined ? placeholder : ""}
                    autoFocus={autoFocus !== undefined ? autoFocus : false}
                    disabled={disabled !== undefined ? disabled : false}
                    style={{height: height}}
                    defaultValue={defaultValue}
                    {...register(name, {required: required})}
                />
            </div>
        );
    };

export default CustomInput;
