import React from 'react';
import styles from './customButton.module.scss'

interface ICustomButtonInterface {
    text: string,
    handleOnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string,
    type?: "button" | "submit" | "reset",
    width?: number,
    height?: number
}

const CustomButton: React.FC<ICustomButtonInterface> =
    ({text, handleOnClick, className, type, width, height}: ICustomButtonInterface) => {
        return (
            <button
                className={styles.custom__btn + " " + className}
                onClick={(e) => handleOnClick ? handleOnClick(e) : undefined}
                type={type ? type : undefined}
                style={{width: width, height: height}}
            >
                {text}
            </button>
        );
    };

export default CustomButton;
