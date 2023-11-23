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
    const tasks = ["theory", "test", "video"]

    function renderRequiredElement(taskName: string, index: number) {
        switch (taskName) {
            case ("theory"):
                return <Theory index={index} indexChoosedItem={levelStore.chosenTaskIndex}
                               changeIndexChoosedItem={() => levelStore.setChosenTaskIndex(levelStore.chosenTaskIndex)}/>
            case ("test"):
                return <Test index={index} indexChoosedItem={levelStore.chosenTaskIndex}
                             changeIndexChoosedItem={() => levelStore.setChosenTaskIndex(levelStore.chosenTaskIndex)}/>
            case ("Video"):
                return <Video index={index}/>
        }
    }

    return (
        <div key={index} className="menu-item" onClick={() => {
            levelStore.setChosenTaskIndex(index)
        }}>
            {renderRequiredElement(tasks[indexType], indexType)}
        </div>
    );
});

export default MenuItem;
