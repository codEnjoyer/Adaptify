import React from 'react';
import styles from './customButton.module.scss'

interface ICustomButtonInterface {
    text: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string
}

const CustomButton: React.FC<ICustomButtonInterface> =
    ({text, handleOnClick, className}: ICustomButtonInterface) => {
        return (
            <button className={styles.custom__btn + " " + className} onClick={(e) => handleOnClick(e)}>
                {text}
            </button>
        );
    };

export default CustomButton;
