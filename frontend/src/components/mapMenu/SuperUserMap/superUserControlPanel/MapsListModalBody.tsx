import React, {ReactNode, useCallback, useState} from 'react';

import ModalWindow from "../../../../UIComponents/modalWindow/ModalWindow.tsx";

import {IMapType} from "../../../../types/MapType.ts";

interface IMapsList {
    maps: IMapType[],
    chooseMap: (map: IMapType) => void
}

const MapsListModalBody: React.FC<IMapsList> = ({maps, chooseMap}) => {
    const [isUsersCardModalOpen, setIsUserCardModalOpen] = useState<boolean>(false)
    const [userProfileModalBody, setUserProfileModalBody] = useState<ReactNode>()

    const handleOnClickUserCard = (map: IMapType) => {
        setIsUserCardModalOpen(true)
        chooseMap(map)
    }

    const handleOnCloseUserCard = useCallback(() => {
        setIsUserCardModalOpen(false)
    }, [])

    return (
        <div className="users-list">
            {maps.map((map) => (
                isUsersCardModalOpen
                    ? <ModalWindow
                        body={userProfileModalBody}
                        onClose={handleOnCloseUserCard}
                        key={map.id}
                    />
                    : (
                        <div key={map.id} className="users-list-user"
                             onClick={() => handleOnClickUserCard(map)}>
                            <div className="map-info">
                                {map.title.toUpperCase()}
                            </div>
                        </div>
                    )
            ))}
        </div>
    );
};

export default MapsListModalBody;
