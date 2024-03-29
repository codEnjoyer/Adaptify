import React, {useCallback} from 'react';
import "./customCheckbox.scss"

interface ICustomCheckboxProps {
    text: string,
    id: string,
    additionalClassName?: string,
    handleOnChange: (e: boolean) => void,
    isChecked: boolean,
}

interface ICheckboxContainerProps {
    classContainer: string
}

const CustomCheckbox: React.FC<ICustomCheckboxProps> =
    ({
         text,
         id,
         additionalClassName,
         handleOnChange,
         isChecked
     }) => {

        const onChangeHandler = useCallback(() => {
            handleOnChange(!isChecked)
        }, [handleOnChange, isChecked])

        return (
            <div
                className={additionalClassName ? additionalClassName + " " + "custom-checkbox" : "custom-checkbox"}
                onClick={onChangeHandler}>
                {isChecked ? <CheckboxActive classContainer="svg-container"/> :
                    <Checkbox classContainer="svg-container"/>}
                <input
                    type="checkbox" id={id}
                    className="input__checkbox"
                    checked={isChecked}
                    onChange={onChangeHandler}
                />
                <label className="checkbox-text" htmlFor={id}>{text}</label>
            </div>
        );
    };

const Checkbox: React.FC<ICheckboxContainerProps> = ({classContainer}) => {
    return (
        <div className={classContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect opacity="0.32" x="1" y="1" width="22" height="22" rx="7.4" stroke="#2B2A29" strokeWidth="2"/>
            </svg>
        </div>
    )
}

const CheckboxActive: React.FC<ICheckboxContainerProps> = ({classContainer}) => {
    return (
        <div className={classContainer}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="8.4" fill="#00D29D"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M18.9058 7.22502C19.1984 7.51817 19.198 7.99305 18.9049 8.28568L10.3999 16.7757C10.1069 17.0681 9.63238 17.0679 9.33967 16.7752L5.09467 12.5302C4.80178 12.2373 4.80178 11.7624 5.09467 11.4696C5.38756 11.1767 5.86244 11.1767 6.15533 11.4696L9.87047 15.1847L17.8451 7.22408C18.1383 6.93145 18.6132 6.93187 18.9058 7.22502Z"
                      fill="#F9F9F9"/>
            </svg>
        </div>
    );
};

export default CustomCheckbox;
