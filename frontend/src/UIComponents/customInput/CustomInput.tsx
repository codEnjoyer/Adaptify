import React from 'react';
import "./customInput.scss"

interface IPropTypes {
    placeholder: string,
    value: string,
    handleOnChange: (e: string) => void,
    type: string,
    autoFocus?: boolean
}

const CustomInput: React.FC<IPropTypes> = ({placeholder, value, handleOnChange, type, autoFocus}) => {
    return (
        <div className="custom-input">
            <input type={type} className="login__input"
                   placeholder={placeholder}
                   value={value}
                   onChange={(e) => {
                       handleOnChange(e.target.value)
                   }}
                   autoFocus={autoFocus !== undefined ? autoFocus : false}
            />
        </div>
    );
};

export default CustomInput;
