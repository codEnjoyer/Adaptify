import React from 'react';
import ArrowLeft from "./UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "./UIChooseModule/ArrowRight.tsx";

interface IPropTypes {

}

const ChooseModuleWindow: React.FC<IPropTypes> = () => {
    return (
        <div className="choose-module-window">
            <div className="choose-module-window__wrapper">
                <div className="left-arrow">
                    <ArrowLeft/>
                </div>
                МОДУЛЬ 1
                <div className="right-arrow">
                    <ArrowRight/>
                </div>
            </div>
        </div>
    );
};

export default ChooseModuleWindow;
