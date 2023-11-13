import React from 'react';
import CustomButton from "../../UIComponents/customButton/CustomButton.tsx";
import authStore from "../../store/authStore.ts";
import {Link, useNavigate} from "react-router-dom";

const MapMenu: React.FC = () => {
    const navigate = useNavigate()

    const onHandleSignOut = () => {
        authStore.signOutUser()
        navigate('/')
    }
    return (
        <div>
            <Link to="/">
                <CustomButton text="Выйти" handleOnClick={onHandleSignOut}/>
            </Link>
        </div>
    );
};

export default MapMenu;
