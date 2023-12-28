import { FC } from 'react';

type LoadingSpinnerProps = {
    asOverlay?: boolean;
};

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ asOverlay }) => {
    return (
        <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default LoadingSpinner;
