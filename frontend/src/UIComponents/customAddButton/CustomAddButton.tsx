import React from 'react';
import styles from "./customAddButton.module.scss"

interface ICustomAddButton {
    handleOnClick: () => void;
}

const CustomAddButton: React.FC<ICustomAddButton> = ({handleOnClick}) => {
    return (
        <div onClick={handleOnClick} className={styles.add__btn}>
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="35" cy="35" r="35" fill="#00D29D"/>
                <path d="M35 10V60M10 34.5H35H60" stroke="white" strokeWidth="4"/>
            </svg>
        </div>
    );
};

export default CustomAddButton;
