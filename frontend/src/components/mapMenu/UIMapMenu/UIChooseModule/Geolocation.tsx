import React, {useState} from 'react';
import {IModalLevelProps} from "../../MapMenu.tsx";
import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";

interface IGeolocationProps {
    id: number,
    level: IModalLevelProps
}

const Geolocation: React.FC<IGeolocationProps> = ({id, level}) => {
    const [isOpenModalWindow, setOpenModalWindow] = useState(false)
    const classNameGeolocation = "geolocation-" + id
    return (
        <div onClick={() => setOpenModalWindow(!isOpenModalWindow)} className={classNameGeolocation}>

            {isOpenModalWindow
                ? <ModalWindow
                    onClose={() => setOpenModalWindow(!isOpenModalWindow)}
                    body={<ModalLevelBody body={level.body} levelName={level.levelName} title={level.title}/>}
                />
                : ""}


            <div>
                <svg width="60" height="104" viewBox="0 0 60 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 101L30 41" stroke="#B0B0B0" strokeWidth="5" strokeLinecap="round"/>
                    <circle cx="30" cy="30" r="30" fill="#B0B0B0"/>
                    <circle cx="30" cy="30" r="15" fill="#E8E8E8"/>
                </svg>
            </div>
        </div>

    );
};

const ModalLevelBody: React.FC<IModalLevelProps> = ({levelName, title, body}) => {
    return (
        <div>
            <div className="level-name">{levelName}</div>
            <div className="level-title">{title}</div>
            <div className="level-body">{body}</div>
        </div>
    );
};

export default Geolocation;
