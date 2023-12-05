import React from 'react';

interface IPropTypes {
    name: string,
    description: string
}

const Achievement: React.FC<IPropTypes> = ({name}) => {
    return (
        <li className="achievements-list-item">
            <p>{name}</p>
            <div className="achievement-image">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0.5 45.5V40.5H5.5V0.5H30.5V3H40.5V40.5H45.5V45.5H35.5V8H30.5V45.5H0.5ZM20.5 25.5C21.2083 25.5 21.8021 25.2604 22.2813 24.7813C22.7604 24.3021 23 23.7083 23 23C23 22.2917 22.7604 21.6979 22.2813 21.2188C21.8021 20.7396 21.2083 20.5 20.5 20.5C19.7917 20.5 19.1979 20.7396 18.7188 21.2188C18.2396 21.6979 18 22.2917 18 23C18 23.7083 18.2396 24.3021 18.7188 24.7813C19.1979 25.2604 19.7917 25.5 20.5 25.5ZM10.5 40.5H25.5V5.5H10.5V40.5Z"
                        fill="#2B2A29"/>
                </svg>
            </div>
        </li>
    );
};

export default Achievement;
