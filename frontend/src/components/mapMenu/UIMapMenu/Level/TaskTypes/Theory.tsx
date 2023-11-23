import React from "react";

interface ITheoryProps {
    index: number,
    indexChoosedItem: number,
    changeIndexChoosedItem: () => void
}

const Theory: React.FC<ITheoryProps> = ({index, indexChoosedItem, changeIndexChoosedItem}) => {

    return (
        <div className="theory" onClick={changeIndexChoosedItem}>
            {index === indexChoosedItem ?
                (
                    <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                        <mask id="mask0_142_18876" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="6"
                              width="28"
                              height="28">
                            <rect x="6" y="6" width="28" height="28" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_142_18876)">
                            <path
                                d="M17.6668 22.333H22.3335V19.9997H17.6668V22.333ZM17.6668 18.833H27.0002V16.4997H17.6668V18.833ZM17.6668 15.333H27.0002V12.9997H17.6668V15.333ZM15.3335 26.9997C14.6918 26.9997 14.1425 26.7712 13.6856 26.3143C13.2286 25.8573 13.0002 25.308 13.0002 24.6663V10.6663C13.0002 10.0247 13.2286 9.47537 13.6856 9.01842C14.1425 8.56148 14.6918 8.33301 15.3335 8.33301H29.3335C29.9752 8.33301 30.5245 8.56148 30.9814 9.01842C31.4384 9.47537 31.6668 10.0247 31.6668 10.6663V24.6663C31.6668 25.308 31.4384 25.8573 30.9814 26.3143C30.5245 26.7712 29.9752 26.9997 29.3335 26.9997H15.3335ZM15.3335 24.6663H29.3335V10.6663H15.3335V24.6663ZM10.6668 31.6663C10.0252 31.6663 9.47586 31.4379 9.01891 30.9809C8.56197 30.524 8.3335 29.9747 8.3335 29.333V12.9997H10.6668V29.333H27.0002V31.6663H10.6668Z"
                                fill="white"/>
                        </g>
                    </svg>
                )
                :
                (
                    <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="white"/>
                        <mask id="mask0_108_18408" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="6"
                              width="28" height="28">
                            <rect x="6" y="6" width="28" height="28" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_108_18408)">
                            <path
                                d="M17.6668 22.333H22.3335V19.9997H17.6668V22.333ZM17.6668 18.833H27.0002V16.4997H17.6668V18.833ZM17.6668 15.333H27.0002V12.9997H17.6668V15.333ZM15.3335 26.9997C14.6918 26.9997 14.1425 26.7712 13.6856 26.3143C13.2286 25.8573 13.0002 25.308 13.0002 24.6663V10.6663C13.0002 10.0247 13.2286 9.47537 13.6856 9.01842C14.1425 8.56148 14.6918 8.33301 15.3335 8.33301H29.3335C29.9752 8.33301 30.5245 8.56148 30.9814 9.01842C31.4384 9.47537 31.6668 10.0247 31.6668 10.6663V24.6663C31.6668 25.308 31.4384 25.8573 30.9814 26.3143C30.5245 26.7712 29.9752 26.9997 29.3335 26.9997H15.3335ZM15.3335 24.6663H29.3335V10.6663H15.3335V24.6663ZM10.6668 31.6663C10.0252 31.6663 9.47586 31.4379 9.01891 30.9809C8.56197 30.524 8.3335 29.9747 8.3335 29.333V12.9997H10.6668V29.333H27.0002V31.6663H10.6668Z"
                                fill="#2B2A29"/>
                        </g>
                    </svg>
                )
            }
        </div>
    );
};

export default Theory
