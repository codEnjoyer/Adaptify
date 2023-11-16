import React from 'react';

interface ICoinsProps {
    coins: number,
    additionalClassname?: string
}

const Coins: React.FC<ICoinsProps> = ({coins, additionalClassname}) => {
    return (
        <div className={additionalClassname}>
            <div className="coins-logo">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_1_33" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="48"
                          height="48">
                        <rect width="48" height="48" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_1_33)">
                        <path
                            d="M30 40C25.5333 40 21.75 38.45 18.65 35.35C15.55 32.25 14 28.4667 14 24C14 19.5333 15.55 15.75 18.65 12.65C21.75 9.55 25.5333 8 30 8C34.4667 8 38.25 9.55 41.35 12.65C44.45 15.75 46 19.5333 46 24C46 28.4667 44.45 32.25 41.35 35.35C38.25 38.45 34.4667 40 30 40ZM14 39.5C10.4667 38.5667 7.58333 36.6667 5.35 33.8C3.11667 30.9333 2 27.6667 2 24C2 20.3333 3.11667 17.0667 5.35 14.2C7.58333 11.3333 10.4667 9.43333 14 8.5V12.7C11.6 13.5333 9.66667 14.9833 8.2 17.05C6.73333 19.1167 6 21.4333 6 24C6 26.5667 6.73333 28.8833 8.2 30.95C9.66667 33.0167 11.6 34.4667 14 35.3V39.5ZM30 36C33.3333 36 36.1667 34.8333 38.5 32.5C40.8333 30.1667 42 27.3333 42 24C42 20.6667 40.8333 17.8333 38.5 15.5C36.1667 13.1667 33.3333 12 30 12C26.6667 12 23.8333 13.1667 21.5 15.5C19.1667 17.8333 18 20.6667 18 24C18 27.3333 19.1667 30.1667 21.5 32.5C23.8333 34.8333 26.6667 36 30 36Z"
                            fill="#F5F5F5"/>
                    </g>
                </svg>
            </div>
            <div className="coins-value">{coins}</div>
        </div>
    );
};

export default Coins;
