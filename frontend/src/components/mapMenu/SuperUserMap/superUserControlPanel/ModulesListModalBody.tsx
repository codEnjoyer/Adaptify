import React, {ReactNode, useCallback, useState} from 'react';

import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";

import {IMapType} from "../../../../types/MapType.ts";
import {IModuleType} from "../../../../types/ModuleType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";
import CustomAddButton from "../../../../UIComponents/customAddButton/CustomAddButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";

interface IModulesList {
    modules: IModuleType[],
    chooseModule: (module: IModuleType) => void,
    levels: ILevelType[],
    chooseLevel: (level: ILevelType) => void
}

const MapsListModalBody: React.FC<IModulesList> = ({modules, chooseModule, levels, chooseLevel}) => {
    const [isUsersMapsModalOpen, setIsUsersMapsModalOpen] = useState<boolean>(false)

    const handleOnClickModuleCard = (module: IModuleType) => {
        setIsUsersMapsModalOpen(true)
        chooseModule(module)
    }

    const handleOnCloseModuleCard = useCallback(() => {
        setIsUsersMapsModalOpen(false)
    }, [])

    return (
        <div>
            <HeaderModal body={<div className="level-name">
                Модули
            </div>}/>

            {isUsersMapsModalOpen
                ? null
                : (
                    <div className="users-list">
                        {modules.map((module) => (
                            (
                                <div key={module.id} className="users-list-user"
                                     onClick={() => handleOnClickModuleCard(module)}>
                                    <div className="map-info">
                                        {module.title.toUpperCase()}
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

export default MapsListModalBody;
