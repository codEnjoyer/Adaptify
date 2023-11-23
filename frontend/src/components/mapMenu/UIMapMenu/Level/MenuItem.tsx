import React from 'react';
import levelStore from "../../../../store/levelStore.ts";
import Theory from "./TaskTypes/Theory.tsx";
import Video from "./TaskTypes/Video.tsx";
import Test from "./TaskTypes/Test.tsx";

interface IMenuItemProps {
    index: number,
    indexType: number
}

const MenuItem: React.FC<IMenuItemProps> = ({index, indexType}) => {
    const tasks = [
        {name: "theory", element: <Theory/>},
        {name: "test", element: <Test/>},
        {name: "video", element: <Video/>}
    ]

    return (
        <div key={index} className="menu-item" onClick={() => {
            levelStore.setChosenTaskIndex(index)
        }}>
            {tasks[indexType].element}
        </div>
    );
};

export default MenuItem;
