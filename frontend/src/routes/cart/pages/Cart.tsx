import { FC } from 'react';
import { useSelector } from 'react-redux';

import Card from '../../../shared/components/UIElements/Card';
import CartItem from '../components/CartItem';

import { RootState } from '../../../store/store';
import Button from '../../../shared/components/FormElements/Button';

import { getTotalPrice } from '../../../shared/util/functions/cart';

const Cart: FC<{ orderView: boolean }> = ({ orderView = false }) => {
    const cartItems = useSelector((store: RootState) => store.cart.items);

    const totalPrice = getTotalPrice(cartItems);

    return (
        <Card className={'cart'}>
            <div>
                <h2>Your Shopping Cart {!cartItems.length && 'is empty'}</h2>
                <h3>${totalPrice.toFixed(2)}</h3>
            </div>
            <ul>
                {cartItems.map((item) => (
                    <CartItem
                        key={item._id}
                        item={item}
                        renderActions={!orderView}
                    />
                ))}
            </ul>

            {!!cartItems.length && !orderView && (
                <div className="cart-order">
                    <Button to="/order">Order</Button>
                </div>
            )}
        </Card>
    );
};

export default Cart;
