import React from 'react';
import CustomButton from "../../../../UIComponents/customButton/CustomButton.tsx";
import CustomInput from "../../../../UIComponents/customInput/CustomInput.tsx";
import CustomAddButton from "../../../../UIComponents/customAddButton/CustomAddButton.tsx";
import {IMapType} from "../../../../types/MapType.ts";
import {IModuleType} from "../../../../types/ModuleType.ts";
import {ILevelType} from "../../../../types/LevelType.ts";

interface IPropTypes {
    classNameSelect: string,
    handleOnClickOptionUnit: (unit: IMapType & IModuleType & ILevelType, index: number) => void,
    handleOnClickDeleteUnit: (unitId: string) => void,
    unitName: string,
    unitNameValue: string,
    handleOnChangeUnitName: (e: React.FormEvent<HTMLInputElement>) => void,
    handleOnClickCreateUnit: (unitName: string) => void,
    currentUnitId?: string,
    availableUnits: IMapType[] & IModuleType[] & ILevelType[]
}

const CreateUnit: React.FC<IPropTypes> =
    ({
         classNameSelect,
         handleOnClickOptionUnit,
         handleOnClickDeleteUnit,
         unitName,
         unitNameValue,
         handleOnChangeUnitName,
         handleOnClickCreateUnit,
         currentUnitId,
         availableUnits
     }) => {
        let btnText = ""

        if (unitName === "map") {
            btnText = "Удалить выбранную карту"
        } else if (unitName === "module") {
            btnText = "Удалить выбранный модуль"
        } else {
            btnText = "Удалить выбранный уровень"
        }

        return (
            <div>
                <select className={classNameSelect}>
                    <option value="-">-</option>
                    {availableUnits.map((map, index) =>
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
                    text={btnText}
                    className={`delete-${unitName}__btn`}
                    handleOnClick={() => currentUnitId ? handleOnClickDeleteUnit(currentUnitId) : undefined}
                />

                <div className={`map-creator-item ${unitName}-create`}>
                    <CustomInput
                        type="text"
                        value={unitNameValue}
                        handleOnChange={(e) => handleOnChangeUnitName(e)}
                    />
                    <CustomAddButton
                        handleOnClick={() => handleOnClickCreateUnit(unitNameValue)}
                    />
                </div>
            </div>
        );
    };

export default CreateUnit;
