import React, { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

type ModalOverlayProps = {
    className?: string;
    children: ReactNode;
    contentClass?: string;
    header: string;
    headerClass?: string;
    footer: ReactNode;
    footerClass?: string;
    style?: CSSProperties;
    onSubmit?: (e: SyntheticEvent) => void;
};

type ModalProps = {
    onCancel: () => void;
    show: boolean;
};

const ModalOverlay: FC<ModalOverlayProps> = ({
    className,
    style,
    headerClass,
    header,
    contentClass,
    children,
    footerClass,
    footer,
    onSubmit,
}) => {
    const content = (
        <div className={`modal ${className}`} style={style}>
            <header className={`modal__header ${headerClass}`}>
                <h2>{header}</h2>
            </header>
            <form
                onSubmit={
                    onSubmit ? onSubmit : (event) => event.preventDefault()
                }
            >
                <div className={`modal__content ${contentClass}`}>
                    {children}
                </div>
                <footer className={`modal__footer ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(
        content,
        document.getElementById('modal-hook')!
    );
};

const Modal: FC<ModalProps & ModalOverlayProps> = ({
    onCancel,
    show,
    ...rest
}) => {
    return (
        <React.Fragment>
            {show && <Backdrop onClick={onCancel} />}
            <CSSTransition
                in={show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames="modal"
            >
                <ModalOverlay {...rest} />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
