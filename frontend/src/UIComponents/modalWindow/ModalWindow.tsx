import React, {PropsWithChildren, useEffect, useRef} from 'react';
import gsap from 'gsap';
import "./modalWindow.scss"

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

            document.addEventListener('keyup', onKeypress);
            gsap.fromTo(element, {opacity: 0}, {opacity: 1, duration: 0.2})

            return () => {
                document.removeEventListener('keyup', onKeypress);
            };
        }, [onClose]);

        return (
            <div className="modal-window" onClick={onClose} ref={element}>
                <div className={`modal-window__content${windowContentStyles !== undefined ? windowContentStyles : ""}`}
                     onClick={(e) => e.stopPropagation()}>
                    <div className="modal-window__body" children={body}></div>
                    <div className="modal-window__btn" onClick={() => onClose()}></div>
                </div>
            </div>
        );
    };

export default ModalWindow;
