import React, {useState} from 'react';
import "./modalLevelBody.scss"
import ArrowLeft from "../../../../UIComponents/UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../../../../UIComponents/UIChooseModule/ArrowRight.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";
import MenuItem from "./MenuItem.tsx";
import {ITheoryUnitType} from "../../../../types/TheoryUnitType.ts";
import {ITaskType} from "../../../../types/TaskType.ts";
import {IMenuItemType} from "../../../../types/MenuItemType.ts";

interface IModalLevelProps {
    title: string,
    theoryUnits?: ITheoryUnitType[],
    taskUnits?: ITaskType[]
}

const ModalLevelBody: React.FC<IModalLevelProps> = ({title, theoryUnits = [], taskUnits = []}) => {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)

    const renderBodyHeader = () => {
        return (
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
            </div>)
    }

    const renderMenuUnitsBlocks = (menuItems: IMenuItemType[]) => {
        const taskBlocks: JSX.Element[] = []
        let index = 1;

        for (let i = 0; i < menuItems.length; i++) {
            for (let j = 0; j < menuItems[i].length; j++) {
                taskBlocks.push(<MenuItem indexType={i} index={index} key={index}/>)
                index++
            }
        }
        return taskBlocks
    }

    const bodyHeader = renderBodyHeader()
    const menuItems: IMenuItemType[] = [{length: theoryUnits.length, type: "theory"}, {
        length: taskUnits.length,
        type: "tests"
    }]

    return (
        <div>
            <HeaderModal body={bodyHeader}/>

            {menuItems
                ? <div
                    className="menu">{renderMenuUnitsBlocks(menuItems, 0)}</div>
                : ""
            }

            {theoryUnits![currentTaskIndex] !== undefined &&
                (
                    <div className="task-info">
                        <div className="level-title">{theoryUnits![currentTaskIndex].title}</div>
                        <div className="level-body">{theoryUnits![currentTaskIndex].content}</div>
                    </div>
                )
            }


            {taskUnits![currentTaskIndex] !== undefined &&
                (<div className="task-info">
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
