import React, {useCallback, useState} from 'react';

import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";

import {IMapType} from "../../../../types/MapType.ts";
import {IModuleType} from "../../../../types/ModuleType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";
import CustomAddButton from "../../../../UIComponents/customAddButton/CustomAddButton.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";
import ModulesListModalBody from "./ModulesListModalBody.tsx";

interface IMapsList {
    maps: IMapType[],
    chooseMap: (map: IMapType) => void,
    modules: IModuleType[],
    chooseModule: (module: IModuleType) => void,
    levels: ILevelType[],
    chooseLevel: (level: ILevelType) => void
}

const MapsListModalBody: React.FC<IMapsList> = ({maps, chooseMap, modules, chooseModule, levels, chooseLevel}) => {
    const [isUsersMapsModalOpen, setIsUsersMapsModalOpen] = useState<boolean>(false)
    console.log(levels)

    const handleOnClickModuleCard = (map: IMapType) => {
        setIsUsersMapsModalOpen(true)
        chooseMap(map)
    }

    const handleOnCloseModuleCard = useCallback(() => {
        setIsUsersMapsModalOpen(false)
    }, [])

    return (
        <div>
            <HeaderModal
                body={<div className="level-name">
                    Карты
                </div>}
            />

            {isUsersMapsModalOpen
                ? (<ModalWindow
                    onClose={handleOnCloseModuleCard}
                    body={<ModulesListModalBody
                        modules={modules}
                        chooseModule={chooseModule}
                        levels={levels}
                        chooseLevel={chooseLevel}
                    />}
                />)
                : (
                    <div className="users-list">
                        {maps.map((map) => (
                            (
                                <div key={map.id} className="users-list-user"
                                     onClick={() => handleOnClickModuleCard(map)}>
                                    <div className="map-info">
                                        {map.title.toUpperCase()}
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
