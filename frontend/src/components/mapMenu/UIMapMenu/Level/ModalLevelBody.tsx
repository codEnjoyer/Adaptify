import React, {useState} from 'react';
import "./modalLevelBody.scss"
import ArrowLeft from "../UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../UIChooseModule/ArrowRight.tsx";
import {ITheoryUnitType} from "../../../../types/TheoryUnitType.ts";
import {ITaskType} from "../../../../types/TaskType.ts";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";

interface IModalLevelProps {
    title: string,
    theoryUnits?: ITheoryUnitType[],
    taskUnits?: ITaskType[]
}

const ModalLevelBody: React.FC<IModalLevelProps> = ({title, theoryUnits, taskUnits}) => {
    const tasks = [
        {name: "theory", element: <Theory/>},
        {name: "video", element: <Video/>},
        {name: "test", element: <Test/>}
    ]

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

    const renderMenuTheoryBlocks = (countTheoryBlocks: number) => {
        const theoryBlocks: JSX.Element[] = []

        for (let i = 0; i < countTheoryBlocks; i++) {
            theoryBlocks.push(<div key={i} className="menu-item" onClick={() => {
                setCurrentTaskIndex(i)
            }}>{tasks[0].element}</div>)
        }
        return theoryBlocks
    }

    const renderMenuTaskBlocks = (countTheoryBlocks: number, countTaskBlocks: number) => {
        const taskBlocks: JSX.Element[] = []

        for (let i = countTheoryBlocks; i < countTaskBlocks + countTheoryBlocks; i++) {
            taskBlocks.push(<div key={i} className="menu-item" onClick={() => {
                setCurrentTaskIndex(i)
            }}>{tasks[2].element}</div>)
        }
        return taskBlocks
    }

    return (
        <div>
            <div className="header-modal">
                <div className="left-arrow">
                    <ArrowLeft/>
                </div>
                <div className="level-name">
                    {title.toUpperCase()}
                </div>
                <div className="right-arrow">
                    <ArrowRight/>
                </div>
            </div>

            {theoryUnits && theoryUnits.length !== 0
                ? <div
                    className="menu">{renderMenuTheoryBlocks(theoryUnits!.length)}{renderMenuTaskBlocks(theoryUnits!.length, taskUnits!.length)}</div>
                : ""}

            {theoryUnits![currentTaskIndex] !== undefined &&
                (<div className="text-info">
                        <div className="level-title">{theoryUnits![currentTaskIndex].title}</div>
                        <div className="level-body">{theoryUnits![currentTaskIndex].content}</div>
                    </div>
                )
            }

            {taskUnits && taskUnits.length !== 0
                ? <div
                    className="menu">{renderMenuTaskBlocks(taskUnits!.length, taskUnits!.length)}</div>
                : ""}

            {taskUnits![currentTaskIndex] !== undefined &&
                (<div className="text-info">
                        <form className="level-body">
                            {taskUnits![currentTaskIndex].questions.map((question) => {
                                return (
                                    <div>
                                        <div
                                            className="level-title">{question.question}</div>

                                        {question.answer_options.map((answer) => {
                                                return (
                                                    <div>
                                                        <input id={answer.answer} type="radio" value="question"/>
                                                        <label htmlFor={answer.answer}>{answer.answer}</label>
                                                    </div>
                                                )
                                            }
                                        )}
                                        <br/>
                                    </div>
                                )
                            })}
                            <CustomButton handleOnClick={(e) => e.preventDefault()}
                                          text="Отправить ответ"/>
                        </form>
                    </div>
                )
            }
        </div>
    );
};

const Theory: React.FC = () => {
    const [isChoosed, setIsChoosed] = useState<boolean>(false)

    return (
        <div className="theory" onClick={() => setIsChoosed(!isChoosed)}>
            {!isChoosed ?
                (<svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                    <mask id="mask0_142_18876" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="6"
                          width="28"
                          height="28">
                        <rect x="6" y="6" width="28" height="28" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_142_18876)">
                        <path
                            d="M17.6668 22.333H22.3335V19.9997H17.6668V22.333ZM17.6668 18.833H27.0002V16.4997H17.6668V18.833ZM17.6668 15.333H27.0002V12.9997H17.6668V15.333ZM15.3335 26.9997C14.6918 26.9997 14.1425 26.7712 13.6856 26.3143C13.2286 25.8573 13.0002 25.308 13.0002 24.6663V10.6663C13.0002 10.0247 13.2286 9.47537 13.6856 9.01842C14.1425 8.56148 14.6918 8.33301 15.3335 8.33301H29.3335C29.9752 8.33301 30.5245 8.56148 30.9814 9.01842C31.4384 9.47537 31.6668 10.0247 31.6668 10.6663V24.6663C31.6668 25.308 31.4384 25.8573 30.9814 26.3143C30.5245 26.7712 29.9752 26.9997 29.3335 26.9997H15.3335ZM15.3335 24.6663H29.3335V10.6663H15.3335V24.6663ZM10.6668 31.6663C10.0252 31.6663 9.47586 31.4379 9.01891 30.9809C8.56197 30.524 8.3335 29.9747 8.3335 29.333V12.9997H10.6668V29.333H27.0002V31.6663H10.6668Z"
                            fill="white"/>
                    </g>
                </svg>)
                :
                (<svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="white"/>
                        <mask id="mask0_108_18408" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="6"
                              width="28" height="28">
                            <rect x="6" y="6" width="28" height="28" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_108_18408)">
                            <path
                                d="M17.6668 22.333H22.3335V19.9997H17.6668V22.333ZM17.6668 18.833H27.0002V16.4997H17.6668V18.833ZM17.6668 15.333H27.0002V12.9997H17.6668V15.333ZM15.3335 26.9997C14.6918 26.9997 14.1425 26.7712 13.6856 26.3143C13.2286 25.8573 13.0002 25.308 13.0002 24.6663V10.6663C13.0002 10.0247 13.2286 9.47537 13.6856 9.01842C14.1425 8.56148 14.6918 8.33301 15.3335 8.33301H29.3335C29.9752 8.33301 30.5245 8.56148 30.9814 9.01842C31.4384 9.47537 31.6668 10.0247 31.6668 10.6663V24.6663C31.6668 25.308 31.4384 25.8573 30.9814 26.3143C30.5245 26.7712 29.9752 26.9997 29.3335 26.9997H15.3335ZM15.3335 24.6663H29.3335V10.6663H15.3335V24.6663ZM10.6668 31.6663C10.0252 31.6663 9.47586 31.4379 9.01891 30.9809C8.56197 30.524 8.3335 29.9747 8.3335 29.333V12.9997H10.6668V29.333H27.0002V31.6663H10.6668Z"
                                fill="#2B2A29"/>
                        </g>
                    </svg>
                )
            }

        </div>
    );
};

const Video: React.FC = () => {
    return (
        <div className="video">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                <mask id="mask0_108_18406" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="7" y="6" width="28"
                      height="28">
                    <rect x="7" y="6" width="28" height="28" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_108_18406)">
                    <path
                        d="M11.6668 29.3337C11.0252 29.3337 10.4759 29.1052 10.0189 28.6482C9.56197 28.1913 9.3335 27.642 9.3335 27.0003V13.0003C9.3335 12.3587 9.56197 11.8094 10.0189 11.3524C10.4759 10.8955 11.0252 10.667 11.6668 10.667H25.6668C26.3085 10.667 26.8578 10.8955 27.3147 11.3524C27.7717 11.8094 28.0002 12.3587 28.0002 13.0003V18.2503L32.6668 13.5837V26.417L28.0002 21.7503V27.0003C28.0002 27.642 27.7717 28.1913 27.3147 28.6482C26.8578 29.1052 26.3085 29.3337 25.6668 29.3337H11.6668ZM11.6668 27.0003H25.6668V13.0003H11.6668V27.0003Z"
                        fill="white"/>
                </g>
            </svg>
        </div>
    )
}

const Test: React.FC = () => {
    return (
        <div className="test">
            <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                <mask id="mask0_108_18405" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="7" width="28"
                      height="28">
                    <rect x="6" y="7" width="28" height="28" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_108_18405)">
                    <path
                        d="M10.6667 31.5V26.5417L26.0375 11.2C26.2708 10.9667 26.5333 10.7917 26.825 10.675C27.1167 10.5583 27.4083 10.5 27.7 10.5C28.0111 10.5 28.3076 10.5583 28.5896 10.675C28.8715 10.7917 29.1194 10.9667 29.3333 11.2L30.9667 12.8333C31.2 13.0472 31.375 13.2951 31.4917 13.5771C31.6083 13.859 31.6667 14.1556 31.6667 14.4667C31.6667 14.7583 31.6083 15.05 31.4917 15.3417C31.375 15.6333 31.2 15.8958 30.9667 16.1292L15.625 31.5H10.6667ZM13 29.1667H14.6333L26.0958 17.7333L25.2792 16.8875L24.4333 16.0708L13 27.5333V29.1667ZM25.2792 16.8875L24.4333 16.0708L26.0958 17.7333L25.2792 16.8875ZM22.3333 31.5C23.7722 31.5 25.1042 31.1403 26.3292 30.4208C27.5542 29.7014 28.1667 28.7 28.1667 27.4167C28.1667 26.7167 27.9819 26.1139 27.6125 25.6083C27.2431 25.1028 26.7472 24.6653 26.125 24.2958L24.4042 26.0167C24.8514 26.2111 25.2014 26.425 25.4542 26.6583C25.7069 26.8917 25.8333 27.1444 25.8333 27.4167C25.8333 27.8639 25.4785 28.2674 24.7688 28.6271C24.059 28.9868 23.2472 29.1667 22.3333 29.1667C22.0028 29.1667 21.7257 29.2785 21.5021 29.5021C21.2785 29.7257 21.1667 30.0028 21.1667 30.3333C21.1667 30.6639 21.2785 30.941 21.5021 31.1646C21.7257 31.3882 22.0028 31.5 22.3333 31.5ZM11.3375 22.575L13.0875 20.825C12.6986 20.6694 12.3924 20.509 12.1688 20.3438C11.9451 20.1785 11.8333 20.0083 11.8333 19.8333C11.8333 19.6 12.0083 19.3667 12.3583 19.1333C12.7083 18.9 13.4472 18.5403 14.575 18.0542C16.2861 17.3153 17.4236 16.6444 17.9875 16.0417C18.5514 15.4389 18.8333 14.7583 18.8333 14C18.8333 12.9306 18.4056 12.0799 17.55 11.4479C16.6944 10.816 15.5667 10.5 14.1667 10.5C13.2917 10.5 12.509 10.6556 11.8187 10.9667C11.1285 11.2778 10.5986 11.6569 10.2292 12.1042C10.0153 12.3569 9.92778 12.6389 9.96667 12.95C10.0056 13.2611 10.1514 13.5139 10.4042 13.7083C10.6569 13.9222 10.9389 14.0097 11.25 13.9708C11.5611 13.9319 11.8236 13.8056 12.0375 13.5917C12.3097 13.3194 12.6111 13.125 12.9417 13.0083C13.2722 12.8917 13.6806 12.8333 14.1667 12.8333C14.9639 12.8333 15.5521 12.95 15.9313 13.1833C16.3104 13.4167 16.5 13.6889 16.5 14C16.5 14.2722 16.3299 14.5201 15.9896 14.7438C15.6493 14.9674 14.8667 15.3611 13.6417 15.925C12.0861 16.6056 11.0069 17.2229 10.4042 17.7771C9.80139 18.3312 9.5 19.0167 9.5 19.8333C9.5 20.4556 9.66528 20.9854 9.99583 21.4229C10.3264 21.8604 10.7736 22.2444 11.3375 22.575Z"
                        fill="white"/>
                </g>
            </svg>

        </div>
    )
}

export default ModalLevelBody;
