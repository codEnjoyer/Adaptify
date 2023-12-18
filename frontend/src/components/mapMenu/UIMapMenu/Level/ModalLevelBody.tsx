import React, {useCallback, useState} from 'react';

import "./modalLevelBody.scss"

import ArrowLeft from "../../../../UIComponents/UIChooseModule/ArrowLeft.tsx";
import ArrowRight from "../../../../UIComponents/UIChooseModule/ArrowRight.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";

import MenuItem from "./MenuItem.tsx";
import TaskOpenQuestionEditor from "./TaskOpenQuestionEditor.tsx";

import {ITaskType, ITheoryUnitType} from "../../../../types/TaskType.ts";
import {IMenuItemType} from "../../../../types/MenuItemType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";
import mapMenuStore from "../../../../store/mapMenuStore.ts";
import moduleMenuStore from "../../../../store/moduleMenuStore.ts";
import axios from "axios";
import SingleChoice from "./QuestionTypes/SingleChoice.tsx";
import {useForm} from "react-hook-form";


interface IModalLevelProps {
    level: ILevelType
}

const ModalLevelBody: React.FC<IModalLevelProps> = ({level}) => {
    const bodyHeader = renderBodyHeader()
    const [levelIndex, setLevelIndex] = useState(1)
    const [textOpenQuestion, setTextOpenQuestion] = useState("")
    const {register, handleSubmit} = useForm()


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

    const renderMenuUnitsBlocks = (menuItems: IMenuItemType[]) => {
        const taskBlocks: JSX.Element[] = []
        let index = 0

        for (let i = 0; i < menuItems.length; i++) {
            for (let j = 0; j < menuItems[i].length; j++) {
                index++
                taskBlocks.push(
                    <MenuItem
                        indexType={i}
                        index={index}
                        key={index}
                        indexSelectedItem={levelIndex}
                        setLevelIndex={setLevelIndex}
                    />
                )
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
                <form
                    className="level-body"
                    onSubmit={handleSubmit((data) => onHandleSubmit(data))}
                >
                    {unit
                        ? unit.questions.map((question) => {
                            switch (question.type) {
                                case "singlechoice": {
                                    return (
                                        <div className="question" key={question.id}>
                                            <div className="question-title">{question.question}</div>

                                            {question.answer_options.map((answer) => {
                                                    return <SingleChoice answer={answer} register={register}/>
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
                                                            <input id={answer.answer} type="checkbox"
                                                                   value="question" {...register(answer.answer)}/>
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
                                            <TaskOpenQuestionEditor
                                                setText={setTextOpenQuestion}
                                            />
                                        </div>
                                    )
                                }
                            }

                        })
                        : null
                    }
                    <CustomButton
                        type="submit"
                        text="Отправить ответ"
                    />
                </form>
            </div>
        )
    }

    const onHandleSubmit = useCallback((data: any) => {
        console.log(data)
        if (level.task_units) {
            if (textOpenQuestion !== "") {
                axios.post("http://localhost:8000" +
                    " /maps/" + mapMenuStore.choosedMap?.id +
                    "/modules/" + moduleMenuStore.choosedModule?.id +
                    "/levels/" + level.id +
                    "/tasks/" + level.task_units[0].id +
                    "/check/", {
                    type: "open",
                    question: level.task_units[0].questions[0],
                    id: level.task_units[0].id,
                    answers: [
                        {
                            answer: textOpenQuestion,
                            id: level.task_units[0].questions[0].answer_options[0].id,
                        }
                    ]
                })
                    .then(r => console.log(r))
            } else {
                axios.post("http://localhost:8000" +
                    " /maps/" + mapMenuStore.choosedMap?.id +
                    "/modules/" + moduleMenuStore.choosedModule?.id +
                    "/levels/" + level.id +
                    "/tasks/" + level.task_units[0].id +
                    "/check/", {})
                    .then(r => console.log(r))
            }
        }
    }, [])


    const renderTasks = (menuItems?: IMenuItemType[], theoryUnits?: ITheoryUnitType[], taskUnits?: ITaskType[]) => {
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
