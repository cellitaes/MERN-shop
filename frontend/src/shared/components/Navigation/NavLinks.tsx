import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { RootState } from '../../../store/store';

const NavLinks = () => {
    const authData = useSelector((store: RootState) => store.authReducers);
    const cartTotalQuantity = useSelector(
        (store: RootState) => store.cartReducers.totalQuantity
    );

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/products">PRODUCTS</NavLink>
            </li>
            {authData.isLoggedIn && (
                <li>
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
            {!authData.isLoggedIn && (
                <li>
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                </li>
            )}
            {/* {authData.isLoggedIn && (
                <li>
                    <button onClick={authData.logout}>LOGOUT</button>
                </li>
            )} */}
        </ul>
    );
};

export default NavLinks;
