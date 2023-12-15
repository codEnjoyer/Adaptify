import React, {useEffect, useState} from 'react';
import "./customProgressBar.scss"

interface IPropTypes {
    progress: number,
    className: string
}

const CustomProgressBar: React.FC<IPropTypes> = ({progress, className}) => {

    const [filled, setFilled] = useState(0);
    useEffect(() => {
        if (filled < progress) {
            if (filled > progress - 5) {
                setFilled(progress);
            } else setTimeout(() => setFilled(prev => prev + 5), 10)
        }
    }, [filled, progress])

    return (
        <div className={className}>
            <div className="progressbar">
                <div style=
                         {{
                             height: "100%",
                             width: `${filled}%`,
                             backgroundColor: "#00D29D",
                             transition: "width 0.5s"
                         }}></div>
                <span className="progressPercent">{filled}%</span>
            </div>
        </div>
    );
};

export default CustomProgressBar;
