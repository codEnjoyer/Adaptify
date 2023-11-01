import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import ModalWindow from "../../UIComponents/modalWindow/ModalWindow.tsx";

const WelcomePage: React.FC = () => {
    const navigateTo = useNavigate()
    const [isModalWindow, setIsModalWindow] = useState(false)

    const setShowModal = () => setIsModalWindow(!isModalWindow)

    return (
        <div>
            <h1>Adaptify</h1>
            <button onClick={() => navigateTo("/authentication")}>Авторизоваться</button>
            {isModalWindow ? <ModalWindow body={"asd"} windowContentStyles={""} onClose={setShowModal}/> : ""}
            <button onClick={setShowModal}>Включить модалку</button>
        </div>
    );
};

export default WelcomePage;
