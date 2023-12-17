import React from 'react';
import styles from './customButton.module.scss'

interface ICustomButtonInterface {
    text: string,
    handleOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
    type?: "button" | "submit" | "reset"
}

const CustomButton: React.FC<ICustomButtonInterface> =
    ({text, handleOnClick, className, type}: ICustomButtonInterface) => {
        return (
            <button
                className={styles.custom__btn + " " + className}
                onClick={(e) => handleOnClick ? handleOnClick(e) : undefined}
                type={type ? type : undefined}
            >
                {text}
            </button>
        );
    };

export default CustomButton;
