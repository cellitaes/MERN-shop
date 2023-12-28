import { FC } from 'react';
import ReactDOM from 'react-dom';

type BackdropProps = {
    onClick: () => void;
};

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={onClick}></div>,
        document.getElementById('backdrop-hook')!
    );
};

export default Backdrop;
