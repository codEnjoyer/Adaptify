import React, {useCallback} from 'react';
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
    value: string,
    changeValue?: (e: string) => void,
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
         value,
         changeValue,
     }) => {
        const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
            if (changeValue)
                changeValue(e.currentTarget.value)
        }, [changeValue])
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
                    {...register(name, validateRules)}
                    onChange={handleOnChange}
                    value={value}
                />
            </div>
        );
    };

export default CustomInput;
