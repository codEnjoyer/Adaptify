import React from 'react';
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import Achievement from "./Achievement.tsx";


interface IUserProfileModalProps {
    img?: string
}

const UserProfileModalBody: React.FC<IUserProfileModalProps> = () => {
    return (
        <div>
            <div className="header-modal-user-profile">
                <h3 className="user-profile-title">ПРОФИЛЬ СОТРУДНИКА</h3>
            </div>
            <img className="user-profile-photo"
                 src="data:image/jpeg;base64,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"
                 alt="Фото профиля"/>
            <div className="user-info-fields">
                <CustomInput type="text" disabled={true} width="350px" value="Фамильева Имя Высочествовична"
                             height="55px"/>
                <CustomInput type="email" disabled={true} width="350px" placeholder="email" value="" height="55px"/>
                <CustomInput type="text" disabled={true} width="350px" placeholder="Дата трудоустройства" value=""
                             height="55px"/>
            </div>
            <div className="achievements">
                <p>ДОСТИЖЕНИЯ</p>
                <ul>
                    <Achievement name="Достижение 1"/>
                    <Achievement name="Достижение 2"/>
                    <Achievement name="Достижение 3"/>
                </ul>
            </div>
        </div>
    );
};

export default UserProfileModalBody;
