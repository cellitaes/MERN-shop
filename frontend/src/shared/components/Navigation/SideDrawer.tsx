import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

type SideDrawerProps = {
    children: ReactNode;
    show: boolean;
    onClick: () => void;
};

const SideDrawer: FC<SideDrawerProps> = ({ children, show, onClick }) => {
    const content = (
        <CSSTransition
            in={show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter
            unmountOnExit
        >
            <aside className="side-drawer" onClick={onClick}>
                {children}
            </aside>
        </CSSTransition>
    );

    return ReactDOM.createPortal(
        content,
        document.getElementById('drawer-hook')!
    );
};

export default SideDrawer;
