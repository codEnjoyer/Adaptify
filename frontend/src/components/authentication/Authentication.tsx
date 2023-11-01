import React from 'react';
import {useNavigate} from "react-router-dom";

const Authentication: React.FC = () => {
    const navigateTo = useNavigate()
    return (
        <div>
            <h1>Авторизация</h1>
            <button onClick={() => navigateTo("/")}>Вернуться обратно</button>
        </div>
    );
};

export default Authentication;
