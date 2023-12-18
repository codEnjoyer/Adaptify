import React, {useState} from 'react';

import "./modalLevelBody.scss"

import ArrowLeft from "../../../../UIComponents/UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../../../../UIComponents/UIChooseModule/ArrowRight.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";

import MenuItem from "./MenuItem.tsx";

import {ITaskType, ITheoryUnitType} from "../../../../types/TaskType.ts";
import {IMenuItemType} from "../../../../types/MenuItemType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";

interface IModalLevelProps {
    level: ILevelType
}

const ModalLevelBody: React.FC<IModalLevelProps> = ({level}) => {
    const bodyHeader = renderBodyHeader()
    const [levelIndex, setLevelIndex] = useState(1)

    const menuItems: IMenuItemType[] = [
        {
            type: "theory",
            length: level.theory_units ? level.theory_units.length : 0,
            // @ts-ignore
            item: level?.theory_units
        },
        {
            length: level.task_units ? level?.task_units.length : 0,
            type: "tests",
            // @ts-ignore
            item: level?.task_units
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
                taskBlocks.push(<MenuItem indexType={i} index={index} key={index} indexSelectedItem={levelIndex}
                                          setLevelIndex={setLevelIndex}/>)

            }
        }
        return taskBlocks
    }

    const renderTheory = (unit: ITheoryUnitType | null) => {
        return (
            unit
                ? (
                    <div className="task-info">
                        <div className="level-title">{unit.title}</div>
                        <div className="level-body">{unit.content}</div>
                    </div>
                )
                : null

        )
    }

    const renderTest = (unit: ITaskType | null) => {
        return (
            <div className="task-info">
                <form className="level-body">
                    {unit
                        ? unit.questions.map((question) => {
                            console.log(question.type)
                            switch (question.type) {
                                case "singlechoice": {
                                    return (
                                        <div className="question" key={question.id}>
                                            <div className="question-title">{question.question}</div>

                                            {question.answer_options.map((answer) => {
                                                    return (
                                                        <div className="question-answer-option" key={answer.id}>
                                                            <input id={answer.answer} type="radio" value="question"/>
                                                            <label htmlFor={answer.answer}>{answer.answer}</label>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    )
                                }
                                case "multiplechoice": {
                                    return (
                                        <div className="question" key={question.id}>
                                            <div className="question-title">{question.question}</div>

                                            {question.answer_options.map((answer) => {
                                                    return (
                                                        <div className="question-answer-option" key={answer.id}>
                                                            <input id={answer.answer} type="radio" value="question"/>
                                                            <label htmlFor={answer.answer}>{answer.answer}</label>
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    )
                                }
                                case "open": {
                                    return (
                                        <div className="question" key={question.id}>
                                            <div className="question-title">{question.question}</div>
                                        </div>
                                    )
                                }
                            }

                        })
                        : null
                    }
                    <CustomButton
                        handleOnClick={(e) => e.preventDefault()}
                        text="Отправить ответ"
                    />
                </form>
            </div>
        )
    }

    function renderTasks(menuItems?: IMenuItemType[], theoryUnits?: ITheoryUnitType[], taskUnits?: ITaskType[]) {
        if (menuItems && levelIndex <= menuItems[0].length) {
            return renderTheory(theoryUnits ? theoryUnits[levelIndex - menuItems[0].length] : null)
        }
        if (menuItems && levelIndex <= menuItems[0].length + menuItems[1].length) {
            return renderTest(taskUnits ? taskUnits[levelIndex - menuItems[0].length - menuItems[1].length] : null)
        }
    }

    return (
        <div>
            <HeaderModal body={bodyHeader}/>
            {menuItems
                ? <div className="menu">{renderMenuUnitsBlocks(menuItems)}</div>
                : ""
            }
            {renderTasks(menuItems, level.theory_units, level.task_units)}
        </div>
    );
};

export default ModalLevelBody;
