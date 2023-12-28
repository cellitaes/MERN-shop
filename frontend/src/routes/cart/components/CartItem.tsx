import { FC } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../shared/components/FormElements/Button';

import { CartItem as CartItemInterface } from '../../../interfaces/Cart';
import { Size } from '../../../models/enums/sizeEnum';

import { cartActions } from '../../../store/slices/cartSlice';

const CartItem: FC<{ item: CartItemInterface; renderActions?: boolean }> = ({
    item,
    renderActions = true,
}) => {
    const dispatch = useDispatch();

    const { name, quantity, totalPrice, price } = item;

    const addItemToCart = () => {
        dispatch(cartActions.addToCart(item));
    };

    const removeFromCart = () => {
        dispatch(cartActions.removeItemFromCart(item._id));
    };

    return (
        <li className={'cart-item'}>
            <header>
                <h3>{name}</h3>
                <div className={'price'}>
                    ${totalPrice.toFixed(2)}{' '}
                    <span className={'itemprice'}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={'details'}>
                <div className={'quantity'}>
                    x <span>{quantity}</span>
                </div>
                {renderActions && (
                    <div className={'actions'}>
                        <Button onClick={removeFromCart} size={Size.medium}>
                            -
                        </Button>
                        <Button onClick={addItemToCart} size={Size.medium}>
                            +
                        </Button>
                    </div>
                )}
            </div>
        </li>
    );
};

export default CartItem;
