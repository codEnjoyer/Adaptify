import React from 'react';

const CustomAddButton: React.FC = () => {
    return (
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="35" r="35" fill="#00D29D"/>
            <path d="M35 10V60M10 34.5H35H60" stroke="white" strokeWidth="4"/>
        </svg>
    );
};

export default CustomAddButton;
