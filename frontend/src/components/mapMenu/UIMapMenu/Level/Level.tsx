import React, {useState} from 'react';
import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";
import ModalLevelBody from "./ModalLevelBody.tsx";
import {ITheoryUnitType} from "../../../../types/TheoryUnitType.ts";
import {ITaskType} from "../../../../types/TaskType.ts";
import levelStore from "../../../../store/levelStore.ts";
import {ILevelType} from "../../../../types/LevelType.ts";

interface IModuleProps {
    id: number,
    level: ILevelType,
}

const Level: React.FC<IModuleProps> = ({id, level}) => {
    const [isOpenModalWindow, setOpenModalWindow] = useState(false)
    const classNameGeolocation = "geolocation-" + id

    return (
        <div onClick={() => setOpenModalWindow(!isOpenModalWindow)} className={classNameGeolocation}>

            {isOpenModalWindow
                ? <ModalWindow
                    onClose={() => {
                        setOpenModalWindow(!isOpenModalWindow)
                        levelStore.closeLevel()
                    }}
                    body={<ModalLevelBody level={level}/>}
                />
                : ""}

            <div>
                <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g style={{mixBlendMode: "color-dodge"}}>
                        <circle cx="75" cy="75" r="75" fill="url(#paint0_radial_108_17393)"/>
                    </g>
                    <defs>
                        <radialGradient id="paint0_radial_108_17393" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                                        gradientTransform="translate(75 75) rotate(90) scale(75)">
                            <stop offset="0.381944" stopColor="white"/>
                            <stop offset="0.798611" stopColor="#D25FED" stopOpacity="0.42"/>
                            <stop offset="0.9999" stopColor="#572463" stopOpacity="0.01"/>
                            <stop offset="1" stopColor="#552361" stopOpacity="0"/>
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};


export default Level;
