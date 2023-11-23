import React, {useEffect, useState} from 'react';
import "./modalLevelBody.scss"
import ArrowLeft from "../../../../UIComponents/UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../../../../UIComponents/UIChooseModule/ArrowRight.tsx";
import {ITheoryUnitType} from "../../../../types/TheoryUnitType.ts";
import {ITaskType} from "../../../../types/TaskType.ts";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import Theory from "./TaskTypes/Theory.tsx";
import Video from "./TaskTypes/Video.tsx";
import Test from "./TaskTypes/Test.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";

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

    const renderMenuTaskBlocks = (countTheoryBlocks: number, countTaskBlocks: number) => {
        const taskBlocks: JSX.Element[] = []

        for (let i = countTheoryBlocks; i < countTaskBlocks + countTheoryBlocks; i++) {
            taskBlocks.push(<div key={i} className="menu-item" onClick={() => {
                setCurrentTaskIndex(i)
            }}>{tasks[2].element}</div>)
        }
        return taskBlocks
    }

    const renderBodyHeader = () => {
        return (
            <div>
                <div className="left-arrow">
                    <ArrowLeft/>
                </div>
                <div className="level-name">
                    {title.toUpperCase()}
                </div>
                <div className="right-arrow">
                    <ArrowRight/>
                </div>
            </div>)
    }

    const bodyHeader = renderBodyHeader()

    return (
        <div>
            <HeaderModal body={bodyHeader}/>

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
                                    <div className="question">
                                        <div className="question-title">{question.question}</div>

                                        {question.answer_options.map((answer) => {
                                                return (
                                                    <div className="question-answer-option">
                                                        <input id={answer.answer} type="radio" value="question"/>
                                                        <label htmlFor={answer.answer}>{answer.answer}</label>
                                                    </div>
                                                )
                                            }
                                        )}
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

export default ModalLevelBody;
