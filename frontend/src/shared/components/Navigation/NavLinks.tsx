import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import PersonIcon from '@mui/icons-material/Person';

import { RootState } from '../../../store/store';

import AccountMenu from './AccountMenu';

const NavLinks = () => {
    const authData = useSelector((store: RootState) => store.auth);
    const cartTotalQuantity = useSelector(
        (store: RootState) => store.cart.totalQuantity
    );

    const [showAccountMenu, setShowAccountMenu] = useState(false);

    const handleCloseAccountMenu = useCallback(() => {
        setShowAccountMenu(false);
    }, []);

    return (
        <ul className="nav-links">
            <li className="nav-links__list-item">
                <NavLink to="/users">USERS</NavLink>
            </li>
            <li className="nav-links__list-item">
                <NavLink to="/products">PRODUCTS</NavLink>
            </li>
            {authData.isLoggedIn && (
                <li className="nav-links__list-item">
                    <NavLink to="/cart" className="cart-link">
                        CART
                        {!!cartTotalQuantity && (
                            <div className="cart-link__total-quantity">
                                {cartTotalQuantity}
                            </div>
                        )}
                    </NavLink>
                </li>
            )}
            {authData.isLoggedIn && (
                <li className="account-manager-link">
                    <PersonIcon
                        className="account-manager-link__icon"
                        fontSize="large"
                        onClick={() => setShowAccountMenu((prev) => !prev)}
                    />
                    <AccountMenu
                        showMenu={showAccountMenu}
                        handleCloseAccountMenu={handleCloseAccountMenu}
                    />
                </li>
            )}
            {!authData.isLoggedIn && (
                <li className="nav-links__list-item">
                    <NavLink to="/auth/login">AUTHENTICATE</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
