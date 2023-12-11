import React, {useEffect} from 'react';
import ProgressBar from "progressbar.js";

interface IPropTypes {
    containerName: string;
}

const CustomProgressBar: React.FC<IPropTypes> = ({containerName}) => {

    useEffect(() => {
        const container = document.querySelector(`#${containerName}`);
        console.log(container)

        if (container && container.children.length === 0) {
            new ProgressBar.Line(`#${containerName}`, {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#FFEA82',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '100%'}
            });
        }
    }, [containerName])

    return (
        <div id={`#${containerName}`}></div>
    );
};

export default CustomProgressBar;
