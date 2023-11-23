import React from 'react';
import levelStore from "../../../../../store/levelStore.ts";

interface IVideoProps {
    index: number
}

const Video: React.FC<IVideoProps> = ({index}) => {
    return (
        <div className="video" onClick={() => levelStore.setChosenTaskIndex(index)}>
            {index === levelStore.chosenTaskIndex ? (
                    <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                        <mask id="mask0_108_18406" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="7" y="6"
                              width="28"
                              height="28">
                            <rect x="7" y="6" width="28" height="28" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_108_18406)">
                            <path
                                d="M11.6668 29.3337C11.0252 29.3337 10.4759 29.1052 10.0189 28.6482C9.56197 28.1913 9.3335 27.642 9.3335 27.0003V13.0003C9.3335 12.3587 9.56197 11.8094 10.0189 11.3524C10.4759 10.8955 11.0252 10.667 11.6668 10.667H25.6668C26.3085 10.667 26.8578 10.8955 27.3147 11.3524C27.7717 11.8094 28.0002 12.3587 28.0002 13.0003V18.2503L32.6668 13.5837V26.417L28.0002 21.7503V27.0003C28.0002 27.642 27.7717 28.1913 27.3147 28.6482C26.8578 29.1052 26.3085 29.3337 25.6668 29.3337H11.6668ZM11.6668 27.0003H25.6668V13.0003H11.6668V27.0003Z"
                                fill="white"/>
                        </g>
                    </svg>
                )
                :
                (
                    <svg width="60" height="60" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="20" fill="#973FAB"/>
                        <mask id="mask0_108_18406" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="7" y="6"
                              width="28"
                              height="28">
                            <rect x="7" y="6" width="28" height="28" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_108_18406)">
                            <path
                                d="M11.6668 29.3337C11.0252 29.3337 10.4759 29.1052 10.0189 28.6482C9.56197 28.1913 9.3335 27.642 9.3335 27.0003V13.0003C9.3335 12.3587 9.56197 11.8094 10.0189 11.3524C10.4759 10.8955 11.0252 10.667 11.6668 10.667H25.6668C26.3085 10.667 26.8578 10.8955 27.3147 11.3524C27.7717 11.8094 28.0002 12.3587 28.0002 13.0003V18.2503L32.6668 13.5837V26.417L28.0002 21.7503V27.0003C28.0002 27.642 27.7717 28.1913 27.3147 28.6482C26.8578 29.1052 26.3085 29.3337 25.6668 29.3337H11.6668ZM11.6668 27.0003H25.6668V13.0003H11.6668V27.0003Z"
                                fill="#2B2A29"/>
                        </g>
                    </svg>
                )
            }
        </div>
    )
}

export default Video;
