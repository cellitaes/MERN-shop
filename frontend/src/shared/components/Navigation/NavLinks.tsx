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
                <NavLink to="/products" data-cy="products">
                    PRODUCTS
                </NavLink>
            </li>
            {authData.isLoggedIn && (
                <li className="nav-links__list-item">
                    <NavLink to="/cart" className="cart-link" data-cy="cart">
                        CART
                        {!!cartTotalQuantity && (
                            <div
                                className="cart-link__total-quantity"
                                data-cy="total-qty"
                            >
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
                        data-cy="account-manager"
                    />
                    <AccountMenu
                        showMenu={showAccountMenu}
                        handleCloseAccountMenu={handleCloseAccountMenu}
                    />
                </li>
            )}
            {!authData.isLoggedIn && (
                <li className="nav-links__list-item">
                    <NavLink to="/auth/login" data-cy="authenticate">
                        AUTHENTICATE
                    </NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
