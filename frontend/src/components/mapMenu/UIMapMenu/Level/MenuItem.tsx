import React from 'react';
import Theory from "./TaskTypes/Theory.tsx";
import Video from "./TaskTypes/Video.tsx";
import Test from "./TaskTypes/Test.tsx";

interface IMenuItemProps {
    index: number,
    indexType: number,
    setLevelIndex: (index: number) => void,
    indexSelectedItem: number,
}

const MenuItem: React.FC<IMenuItemProps> = ({index, indexType, setLevelIndex, indexSelectedItem}) => {
    function renderRequiredElement(indexType: number, index: number) {
        switch (indexType) {
            case (0):
                return <Theory
                    index={index}
                    indexChoosedItem={indexSelectedItem}
                    changeIndexChoosedItem={() => setLevelIndex(index)}
                />
            case (1):
                return <Test
                    index={index}
                    indexChoosedItem={indexSelectedItem}
                    changeIndexChoosedItem={() => setLevelIndex(index)}
                />
            case (2):
                return <Video
                    index={index}
                />
        }
    }

    return (
        <div key={index} className="menu-item"
             onClick={() => {
                 setLevelIndex(index)
             }}>
            {renderRequiredElement(indexType, index)}
        </div>
    );
};

export default MenuItem;
