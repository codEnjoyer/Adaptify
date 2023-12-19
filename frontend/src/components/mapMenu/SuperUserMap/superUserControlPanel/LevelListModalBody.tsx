import React, {useCallback, useState} from 'react';
import {ILevelType} from "../../../../types/LevelType.ts";
import CustomAddButton from "../../../../UIComponents/customAddButton/CustomAddButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";
import ModalLevelBody from "../../UIMapMenu/Level/ModalLevelBody.tsx";
import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";

interface ILevelList {
    levels: ILevelType[],
    chooseLevel: (level: ILevelType) => void
}

const LevelListModalBody: React.FC<ILevelList> = ({levels, chooseLevel}) => {
    const [isUsersLevelModalOpen, setIsUsersLevelModalOpen] = useState<boolean>(false)
    const [level, setLevel] = useState<ILevelType>()

    const handleOnClickLevelCard = (level: ILevelType) => {
        setIsUsersLevelModalOpen(true)
        setLevel(level)
        chooseLevel(level)
    }

    const handleOnCloseModalLevel = useCallback(() => {
        setIsUsersLevelModalOpen(false)
    }, [])

    return (
        <div>
            <HeaderModal body={<div className="level-name">
                Уровни
            </div>}/>

            {isUsersLevelModalOpen && level !== undefined
                ? <ModalWindow
                    onClose={handleOnCloseModalLevel}
                    body={<ModalLevelBody level={level}/>}/>
                : (
                    <div className="users-list">
                        {levels.map((level) => (
                            (
                                <div key={level.id} className="users-list-user"
                                     onClick={() => handleOnClickLevelCard(level)}>
                                    <div className="map-info">
                                        {level.title.toUpperCase()}
                                    </div>
                                </div>
                            )
                        ))}
                        <div className="users-list-user">
                            <div className="map-info">
                                <CustomAddButton handleOnClick={() => console.log(1)}/> {/*openModalCreateMap}*/}
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default LevelListModalBody;
