import React, {useCallback, useState} from 'react';
import {IAnswerType} from "../../../../../types/TaskType.ts";
import {UseFormRegister} from "react-hook-form";

interface IPropTypes {
    answer: IAnswerType,
    register: UseFormRegister<any>
}

const SingleChoice: React.FC<IPropTypes> = ({answer, register}) => {
    const [isChecked, setCheck] = useState<boolean>(false)

    const handleOnCheck = useCallback(() => {
        setCheck(!isChecked)
    }, [isChecked])

    return (
        <div className="question-answer-option" key={answer.id}>
            <input
                id={answer.answer}
                type="radio"
                value="question"
                checked={isChecked}
                onClick={handleOnCheck}
                {...register(answer.answer)}
            />
            <label htmlFor={answer.answer}>{answer.answer}</label>
        </div>
    )
};

export default SingleChoice;
