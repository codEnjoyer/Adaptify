import React, {FormEvent, useCallback, useState} from 'react';
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import HeaderModal from "../../../../UIComponents/modalWindow/HeaderModal.tsx";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import mapMenuStore from "../../../../store/mapMenuStore.ts";


const CreateMapModalBody: React.FC = () => {
    const [mapName, setNewMapName] = useState<string>("")

    const handleOnChangeNewMapName = useCallback((e: FormEvent<HTMLInputElement>) => {
        setNewMapName(e.currentTarget.value)
    }, [])

    const handleOnClickCreateMap = useCallback(() => {
        console.log(mapName)
        if (mapName !== "")
            mapMenuStore.createMap(mapName).then(() => mapMenuStore.fetchAvailableMaps())
    }, [mapName])

    return (
        <div>
            <HeaderModal body="Создание карты"/>
            <div className="create-map">
                <div className="create-map-header">Название карты:</div>
                <CustomInput
                    type="text"
                    value={mapName}
                    handleOnChange={handleOnChangeNewMapName}
                    className="create-map__input"
                    width={200}
                />
            </div>
            <CustomButton text="Добавить новую карту" className="add-map__btn" handleOnClick={handleOnClickCreateMap}/>
        </div>
    );
};

export default CreateMapModalBody;
