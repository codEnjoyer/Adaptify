import React, {PropsWithChildren, useEffect, useRef} from 'react';
import "./modalWindow.scss"
import gsap from 'gsap';

interface ModalWindowProps {
    body: React.ReactNode,
    windowContentStyles?: string,
    onSubmit?: () => void,
    onClose: () => void,
}

const ModalWindow: React.FC<ModalWindowProps> =
    ({body, onClose, windowContentStyles}: PropsWithChildren<ModalWindowProps>) => {
        const element = useRef(null);


        useEffect(() => {
            const onKeypress = (e: KeyboardEvent) => e?.key === "Esc" || e.key === "Escape" ? onClose() : null;
            gsap.fromTo(element.current, {opacity: 0}, {opacity: 1, duration: 0.2})
            gsap.to(element.current, {duration: 0.5, scale: 1.3, ease: "expoScale(i, 2)"});
            document.addEventListener('keyup', onKeypress);

            return () => {
                document.removeEventListener('keyup', onKeypress);
            };
        },);

        return (
            <div className="modal-window" onClick={onClose} ref={element}>
                <div className={`modal-window__content ${windowContentStyles !== undefined ? windowContentStyles : ""}`}
                     onClick={(e) => e.stopPropagation()}>
                    <div className="modal-window__body" children={body}></div>
                    <div className="modal-window__btn" onClick={() => onClose()}></div>
                </div>
            </div>
        );
    };

export default ModalWindow;
