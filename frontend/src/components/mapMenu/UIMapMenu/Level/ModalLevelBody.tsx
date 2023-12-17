import React from 'react';

import "./modalLevelBody.scss"

import ArrowLeft from "../../../../UIComponents/UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../../../../UIComponents/UIChooseModule/ArrowRight.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";

import MenuItem from "./MenuItem.tsx";

import {ITaskType, ITheoryUnitType} from "../../../../types/TaskType.ts";
import {IMenuItemType} from "../../../../types/MenuItemType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";

import levelStore from "../../../../store/levelStore.ts";
import {observer} from "mobx-react-lite";

interface IModalLevelProps {
    level: ILevelType
}

const ModalLevelBody: React.FC<IModalLevelProps> = observer(({level}) => {
    const bodyHeader = renderBodyHeader()

    const menuItems: IMenuItemType[] = [
        {
            type: "theory",
            length: level.theoryUnits ? level.theoryUnits.length : 0,
            item: level?.theoryUnits
        },
        {
            length: level.taskUnits ? level?.taskUnits.length : 0,
            type: "tests",
            item: level?.taskUnits
        },
        {
            type: "task",
            length: level.taskUnits ? level?.taskUnits.length : 0,
            item: level?.taskUnits
        }
    ]

    function renderBodyHeader() {
        return (
            <div className="header-modal">
                <div className="left-arrow">
                    <ArrowLeft/>
                </div>
                <div className="level-name">
                    {level.title.toUpperCase()}
                </div>
                <div className="right-arrow">
                    <ArrowRight/>
                </div>
            </div>
        )
    }

    function renderMenuUnitsBlocks(menuItems: IMenuItemType[]) {
        const taskBlocks: JSX.Element[] = []
        let index = 0

        for (let i = 0; i < menuItems.length; i++) {
            for (let j = 0; j < menuItems[i].length; j++) {
                index++
                taskBlocks.push(<MenuItem indexType={i} index={index} key={index}/>)
            }
        }
        return taskBlocks
    }

    function renderChosenTask(unit: ITheoryUnitType & ITaskType, type: string) {
        switch (type) {
            case ("theory"):
                return (
                    <div className="task-info">
                        <div className="level-title">{unit.title}</div>
                        <div className="level-body">{unit.content}</div>
                    </div>
                )
            case ("test"):
                return (
                    <div className="task-info">
                        <form className="level-body">
                            {unit.questions.map((question) => {
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
            case ("task"):
                return (
                    <div>
                        {unit.title}
                        {unit.content}
                    </div>
                )
            default:
                return (<div>Блок пуст</div>)
        }
    }

    function renderTasks(menuItems?: IMenuItemType[], theoryUnits?: ITheoryUnitType[], taskUnits?: ITaskType[]) {
        if (menuItems && levelStore.chosenTaskIndex <= menuItems[0].length)
            return renderChosenTask(theoryUnits[levelStore.chosenTaskIndex - 1], "theory")
        if (menuItems && levelStore.chosenTaskIndex <= menuItems[0].length + menuItems[1].length)
            return renderChosenTask(taskUnits[levelStore.chosenTaskIndex - menuItems[0].length - 1], "test")
    }

    return (
        <div>
            <HeaderModal body={bodyHeader}/>

            {menuItems
                ? <div className="menu">{renderMenuUnitsBlocks(menuItems)}</div>
                : ""
            }

            {renderTasks(menuItems, level.theoryUnits, level.taskUnits)}
        </div>
    );
});

export default ModalLevelBody;
