import { useRef, useEffect, useCallback, FC } from 'react';
import { NavLink } from 'react-router-dom';

import StoreIcon from '@mui/icons-material/Store';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { authActions } from '../../../store/slices/authSlice';

interface AccountMenuProps {
    showMenu: boolean;
    handleCloseAccountMenu: () => void;
}

const accountMenuItems = [
    {
        key: 'settings',
        to: '/settings',
        icon: <SettingsApplicationsIcon fontSize="large" />,
        text: 'Settings',
        adminOption: false,
        'data-cy': 'settings',
    },
    {
        key: 'manageProducts',
        to: '/manage/products',
        icon: <StoreIcon fontSize="large" />,
        text: 'Manage products',
        adminOption: true,
        'data-cy': 'manage-products',
    },
    {
        key: 'manageUsers',
        to: '/manage/users',
        icon: <PeopleIcon fontSize="large" />,
        text: 'Manage users',
        adminOption: true,
        'data-cy': 'manage-users',
    },
    {
        key: 'logout',
        to: '/',
        icon: <LogoutIcon fontSize="large" />,
        text: 'Logout',
        adminOption: false,
        'data-cy': 'logout',
    },
];

const AccountMenu: FC<AccountMenuProps> = ({
    showMenu,
    handleCloseAccountMenu,
}) => {
    const isAdmin = useSelector((store: RootState) => store.auth.isAdmin);
    const dispatch = useDispatch();

    const accountMenuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (
                accountMenuRef.current &&
                !accountMenuRef.current.contains(event.target as Node)
            ) {
                handleCloseAccountMenu();
            }
        },
        [handleCloseAccountMenu]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const logout = () => {
        handleCloseAccountMenu();
        dispatch(authActions.logout());
    };

    return (
        <>
            {showMenu && (
                <div ref={accountMenuRef} className="account-menu-container">
                    <ul>
                        {accountMenuItems.map(
                            ({ adminOption, key, to, icon, text, ...rest }) => {
                                if (adminOption && adminOption !== isAdmin)
                                    return null;
                                return (
                                    <li key={key}>
                                        <NavLink
                                            to={to}
                                            className="account-menu-container__anchor"
                                            onClick={
                                                key === 'logout'
                                                    ? logout
                                                    : handleCloseAccountMenu
                                            }
                                            {...rest}
                                        >
                                            <span className="account-menu-icon">
                                                {icon}
                                            </span>
                                            <span className="account-menu-text">
                                                {text}
                                            </span>
                                        </NavLink>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default AccountMenu;
