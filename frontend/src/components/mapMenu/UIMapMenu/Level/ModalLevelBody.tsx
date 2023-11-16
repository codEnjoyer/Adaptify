import React, {useState} from 'react';
import "./modalLevelBody.scss"
import ArrowLeft from "../UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../UIChooseModule/ArrowRight.tsx";

export interface IModalLevelProps {
    levelName: string,
    title: string,
    menu: MenuType[]
}

type MenuType = {
    taskName: string,
    body: string
}

interface taskType {
    name: string,
    element: JSX.Element
}


const ModalLevelBody: React.FC<IModalLevelProps> = ({levelName, title, menu}) => {
    const tasks: taskType[] = [
        {name: "theory", element: <Theory/>},
        {name: "video", element: <Video/>},
        {name: "test", element: <Test/>}
    ]

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

    return (
        <div>
            <div className="header-modal">
                <div className="left-arrow">
                    <ArrowLeft/>
                </div>
                <div className="level-name">
                    {levelName}
                </div>
                <div className="right-arrow">
                    <ArrowRight/>
                </div>
            </div>

            <div className="menu">
                {menu.map((item, index) =>
                    tasks.map((task) => {
                        return task.name === item.taskName
                            ? <div key={index} className="menu-item" onClick={() => {
                                setCurrentTaskIndex(index)
                            }}>{task.element}</div>
                            : ""
                    }))}

            </div>
            <div className="text-info">
                <div className="level-title">{title.toUpperCase()}</div>
                <div className="level-body">{menu[currentTaskIndex].body}</div>
            </div>
        </div>
    );
};

const Theory: React.FC = () => {
    return (
        <div className="theory">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#D9D9D9"/>
                <mask id="mask0_1_1339" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="10" y="10" width="40"
                      height="40">
                    <rect x="10" y="10" width="40" height="40" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1_1339)">
                    <path
                        d="M26.6667 33.3333H33.3334V30H26.6667V33.3333ZM26.6667 28.3333H40V25H26.6667V28.3333ZM26.6667 23.3333H40V20H26.6667V23.3333ZM23.3334 40C22.4167 40 21.632 39.6736 20.9792 39.0208C20.3264 38.368 20 37.5833 20 36.6666V16.6666C20 15.75 20.3264 14.9653 20.9792 14.3125C21.632 13.6597 22.4167 13.3333 23.3334 13.3333H43.3334C44.25 13.3333 45.0348 13.6597 45.6875 14.3125C46.3403 14.9653 46.6667 15.75 46.6667 16.6666V36.6666C46.6667 37.5833 46.3403 38.368 45.6875 39.0208C45.0348 39.6736 44.25 40 43.3334 40H23.3334ZM23.3334 36.6666H43.3334V16.6666H23.3334V36.6666ZM16.6667 46.6666C15.75 46.6666 14.9653 46.3403 14.3125 45.6875C13.6598 45.0347 13.3334 44.25 13.3334 43.3333V20H16.6667V43.3333H40V46.6666H16.6667Z"
                        fill="#2B2A29"/>
                </g>
            </svg>
        </div>
    );
};

const Video: React.FC = () => {
    return (
        <div className="video">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#D9D9D9"/>
                <mask id="mask0_1_1337" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="12" y="10" width="40"
                      height="40">
                    <rect x="12" y="10" width="40" height="40" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1_1337)">
                    <path
                        d="M18.6667 43.3333C17.75 43.3333 16.9653 43.0069 16.3125 42.3542C15.6598 41.7014 15.3334 40.9167 15.3334 40V20C15.3334 19.0833 15.6598 18.2986 16.3125 17.6458C16.9653 16.993 17.75 16.6667 18.6667 16.6667H38.6667C39.5834 16.6667 40.3681 16.993 41.0209 17.6458C41.6737 18.2986 42 19.0833 42 20V27.5L48.6667 20.8333V39.1667L42 32.5V40C42 40.9167 41.6737 41.7014 41.0209 42.3542C40.3681 43.0069 39.5834 43.3333 38.6667 43.3333H18.6667ZM18.6667 40H38.6667V20H18.6667V40Z"
                        fill="#2B2A29"/>
                </g>
            </svg>
        </div>
    )
}

const Test: React.FC = () => {
    return (
        <div className="test">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="30" cy="30" r="30" fill="#D9D9D9"/>
                <mask id="mask0_1_1219" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="10" y="10" width="40"
                      height="40">
                    <rect x="10" y="10" width="40" height="40" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1_1219)">
                    <path
                        d="M16.6667 45V37.9167L38.625 16C38.9583 15.6667 39.3333 15.4167 39.75 15.25C40.1667 15.0833 40.5833 15 41 15C41.4444 15 41.8681 15.0833 42.2708 15.25C42.6736 15.4167 43.0278 15.6667 43.3333 16L45.6667 18.3333C46 18.6389 46.25 18.9931 46.4167 19.3958C46.5833 19.7986 46.6667 20.2222 46.6667 20.6667C46.6667 21.0833 46.5833 21.5 46.4167 21.9167C46.25 22.3333 46 22.7083 45.6667 23.0417L23.75 45H16.6667ZM20 41.6667H22.3333L38.7083 25.3333L37.5417 24.125L36.3333 22.9583L20 39.3333V41.6667ZM37.5417 24.125L36.3333 22.9583L38.7083 25.3333L37.5417 24.125ZM33.3333 45C35.3889 45 37.2917 44.4861 39.0417 43.4583C40.7917 42.4306 41.6667 41 41.6667 39.1667C41.6667 38.1667 41.4028 37.3056 40.875 36.5833C40.3472 35.8611 39.6389 35.2361 38.75 34.7083L36.2917 37.1667C36.9306 37.4444 37.4306 37.75 37.7917 38.0833C38.1528 38.4167 38.3333 38.7778 38.3333 39.1667C38.3333 39.8056 37.8264 40.3819 36.8125 40.8958C35.7986 41.4097 34.6389 41.6667 33.3333 41.6667C32.8611 41.6667 32.4653 41.8264 32.1458 42.1458C31.8264 42.4653 31.6667 42.8611 31.6667 43.3333C31.6667 43.8056 31.8264 44.2014 32.1458 44.5208C32.4653 44.8403 32.8611 45 33.3333 45ZM17.625 32.25L20.125 29.75C19.5694 29.5278 19.1319 29.2986 18.8125 29.0625C18.4931 28.8264 18.3333 28.5833 18.3333 28.3333C18.3333 28 18.5833 27.6667 19.0833 27.3333C19.5833 27 20.6389 26.4861 22.25 25.7917C24.6944 24.7361 26.3194 23.7778 27.125 22.9167C27.9306 22.0556 28.3333 21.0833 28.3333 20C28.3333 18.4722 27.7222 17.2569 26.5 16.3542C25.2778 15.4514 23.6667 15 21.6667 15C20.4167 15 19.2986 15.2222 18.3125 15.6667C17.3264 16.1111 16.5694 16.6528 16.0417 17.2917C15.7361 17.6528 15.6111 18.0556 15.6667 18.5C15.7222 18.9444 15.9306 19.3056 16.2917 19.5833C16.6528 19.8889 17.0556 20.0139 17.5 19.9583C17.9444 19.9028 18.3194 19.7222 18.625 19.4167C19.0139 19.0278 19.4444 18.75 19.9167 18.5833C20.3889 18.4167 20.9722 18.3333 21.6667 18.3333C22.8056 18.3333 23.6458 18.5 24.1875 18.8333C24.7292 19.1667 25 19.5556 25 20C25 20.3889 24.7569 20.7431 24.2708 21.0625C23.7847 21.3819 22.6667 21.9444 20.9167 22.75C18.6944 23.7222 17.1528 24.6042 16.2917 25.3958C15.4306 26.1875 15 27.1667 15 28.3333C15 29.2222 15.2361 29.9792 15.7083 30.6042C16.1806 31.2292 16.8194 31.7778 17.625 32.25Z"
                        fill="#2B2A29"/>
                </g>
            </svg>
        </div>
    )
}

export default ModalLevelBody;
