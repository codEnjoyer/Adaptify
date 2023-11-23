import React from 'react';
import levelStore from "../../../../store/levelStore.ts";
import Theory from "./TaskTypes/Theory.tsx";
import Video from "./TaskTypes/Video.tsx";
import Test from "./TaskTypes/Test.tsx";
import {observer} from "mobx-react-lite";

interface IMenuItemProps {
    index: number,
    indexType: number
}

const MenuItem: React.FC<IMenuItemProps> = observer(({index, indexType}) => {
    function renderRequiredElement(indexType: number, index: number) {
        switch (indexType) {
            case (0):
                return <Theory index={index} indexChoosedItem={levelStore.chosenTaskIndex}
                               changeIndexChoosedItem={() => levelStore.setChosenTaskIndex(levelStore.chosenTaskIndex)}/>
            case (1):
                return <Test index={index} indexChoosedItem={levelStore.chosenTaskIndex}
                             changeIndexChoosedItem={() => levelStore.setChosenTaskIndex(levelStore.chosenTaskIndex)}/>
            case (2):
                return <Video index={index}/>
        }
    }

    return (
        <div key={index} className="menu-item" onClick={() => {
            levelStore.setChosenTaskIndex(index)
        }}>
            {renderRequiredElement(indexType, index)}
        </div>
    );
});

export default MenuItem;
