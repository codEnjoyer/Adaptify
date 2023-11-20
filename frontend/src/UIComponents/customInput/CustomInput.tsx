import React from 'react';
import "./customInput.scss"

interface IPropTypes {
    placeholder?: string,
    value: string,
    handleOnChange?: (e: string) => void,
    type: string,
    autoFocus?: boolean,
    disabled?: boolean,
    width?: string
}

const CustomInput: React.FC<IPropTypes> = ({placeholder, value, handleOnChange, type, autoFocus, disabled, width}) => {
    console.log(width)
    return (
        <div className="custom-input" style={{width: width}}>
            <input type={type} className="login__input"
                   placeholder={placeholder !== undefined ? placeholder : ""}
                   value={value}
                   onChange={(e) => {
                       if (handleOnChange)
                           handleOnChange(e.target.value)
                   }}
                   autoFocus={autoFocus !== undefined ? autoFocus : false}
                   disabled={disabled !== undefined ? disabled : false}
            />
        </div>
    );
};

export default CustomInput;
