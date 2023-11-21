import React from 'react';

interface IPropTypes {
    moduleName?: string
}

const ChooseModuleWindow: React.FC<IPropTypes> = ({moduleName}) => {
    return (
        <div className="choose-module-window">
            <div className="choose-module-window__wrapper">
                <br/>
                {moduleName}
            </div>
        </div>
    );
};

export default ChooseModuleWindow;
