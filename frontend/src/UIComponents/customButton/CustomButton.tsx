import React from 'react';
import styles from './customButton.module.scss'

interface ICustomButtonInterface {
    text: string,
    handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    additionalClassName?: string
}

const CustomButton: React.FC<ICustomButtonInterface> =
    ({text, handleOnClick, additionalClassName}: ICustomButtonInterface) => {
        return (
            <button className={styles.custom__btn + " " + additionalClassName} onClick={(e) => handleOnClick(e)}>
                {text}
            </button>
        );
    };

export default CustomButton;
