import { FC, ReactNode } from 'react';

type MainHeaderProps = {
    children: ReactNode;
};

const MainHeader: FC<MainHeaderProps> = ({ children }) => {
    return <header className="main-header">{children}</header>;
};

export default MainHeader;
