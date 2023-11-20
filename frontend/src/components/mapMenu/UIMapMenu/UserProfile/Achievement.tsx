import React from 'react';

interface IPropTypes {
    name: string
}

const Achievement: React.FC<IPropTypes> = ({name}) => {
    return (
        <li>
            {name}
        </li>
    );
};

export default Achievement;
