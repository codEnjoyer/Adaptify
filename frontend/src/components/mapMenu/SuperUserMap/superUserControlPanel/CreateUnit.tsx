import React from 'react';
import mapMenuStore from "../../../../store/mapMenuStore.ts";
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import CustomAddButton from "../../../../UIComponents/customAddButton/CustomAddButton.tsx";
import {IMapType} from "../../../../types/MapType.ts";
import {IModuleType} from "../../../../types/ModuleType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";

interface IPropTypes {
    classNameSelect: string,
    handleOnClickOptionUnit: (unit: IMapType | IModuleType | ILevelType, index: number) => void,
    handleOnClickDeleteUnit: (unitId: string) => void,
    unitName: string,
    handleOnChangeUnitName: (e: React.FormEvent<HTMLInputElement>) => void,
    handleOnClickCreateUnit: (unitName: string) => void,
    currentUnitId: string
}

const CreateUnit: React.FC<IPropTypes> =
    ({
         classNameSelect,
         handleOnClickOptionUnit,
         handleOnClickDeleteUnit,
         unitName,
         handleOnChangeUnitName,
         handleOnClickCreateUnit,
         currentUnitId
     }) => {
        return (
            <div>
                <select className={classNameSelect}>
                    <option value="-">-</option>
                    {mapMenuStore.availableMaps?.map((map, index) =>
                        <option
                            key={map.id}
                            value={map.title}
                            onClick={() => handleOnClickOptionUnit(map, index)}
                        >
                            {map.title}
                        </option>)
                    }
                </select>

                <CustomButton
                    text="Удалить выбранную карту"
                    className={`delete-${unitName}__btn`}
                    handleOnClick={() => handleOnClickDeleteUnit(currentUnitId)}
                />

                <div className={`map-creator-item ${unitName}-create`}>
                    <CustomInput
                        type="text"
                        value={unitName}
                        handleOnChange={(e) => handleOnChangeUnitName(e)}
                    />
                    <CustomAddButton
                        handleOnClick={() => handleOnClickCreateUnit(unitName)}
                    />
                </div>
            </div>
        );
    };

export default CreateUnit;
