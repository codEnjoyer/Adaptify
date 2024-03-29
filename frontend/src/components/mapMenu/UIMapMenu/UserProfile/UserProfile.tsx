import React, {useState} from 'react';
import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";
import UserProfileModalBody from "./UserProfileModalBody.tsx";
import "./userProfileModalBody.scss"
import {IEmployeeType} from "../../../../types/EmployeeType.ts";

interface IPropTypes {
    employee?: IEmployeeType,
    logOut: () => void
}

const UserProfile: React.FC<IPropTypes> = ({employee, logOut}) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (
        <div>
            <div className="user-profile" onClick={() => setIsModalOpen(!isModalOpen)}>
                <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="35" cy="35" r="35" fill="#00D29D"/>
                    <mask id="mask0_108_14359" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="11" y="11"
                          width="48"
                          height="48">
                        <rect x="11" y="11" width="48" height="48" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_108_14359)">
                        <path
                            d="M35 35C32.8 35 30.9167 34.2167 29.35 32.65C27.7833 31.0833 27 29.2 27 27C27 24.8 27.7833 22.9167 29.35 21.35C30.9167 19.7833 32.8 19 35 19C37.2 19 39.0833 19.7833 40.65 21.35C42.2167 22.9167 43 24.8 43 27C43 29.2 42.2167 31.0833 40.65 32.65C39.0833 34.2167 37.2 35 35 35ZM19 51V45.4C19 44.2667 19.2917 43.225 19.875 42.275C20.4583 41.325 21.2333 40.6 22.2 40.1C24.2667 39.0667 26.3667 38.2917 28.5 37.775C30.6333 37.2583 32.8 37 35 37C37.2 37 39.3667 37.2583 41.5 37.775C43.6333 38.2917 45.7333 39.0667 47.8 40.1C48.7667 40.6 49.5417 41.325 50.125 42.275C50.7083 43.225 51 44.2667 51 45.4V51H19ZM23 47H47V45.4C47 45.0333 46.9083 44.7 46.725 44.4C46.5417 44.1 46.3 43.8667 46 43.7C44.2 42.8 42.3833 42.125 40.55 41.675C38.7167 41.225 36.8667 41 35 41C33.1333 41 31.2833 41.225 29.45 41.675C27.6167 42.125 25.8 42.8 24 43.7C23.7 43.8667 23.4583 44.1 23.275 44.4C23.0917 44.7 23 45.0333 23 45.4V47ZM35 31C36.1 31 37.0417 30.6083 37.825 29.825C38.6083 29.0417 39 28.1 39 27C39 25.9 38.6083 24.9583 37.825 24.175C37.0417 23.3917 36.1 23 35 23C33.9 23 32.9583 23.3917 32.175 24.175C31.3917 24.9583 31 25.9 31 27C31 28.1 31.3917 29.0417 32.175 29.825C32.9583 30.6083 33.9 31 35 31Z"
                            fill="#F5F5F5"/>
                    </g>
                </svg>
            </div>
            {isModalOpen && <ModalWindow onClose={() => setIsModalOpen(!isModalOpen)} body={<UserProfileModalBody logOut={logOut} employee={employee}/>}/>}
        </div>
    );
};

export default UserProfile;
