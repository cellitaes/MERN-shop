import { CartItem } from '../../../interfaces/Cart';

export const getTotalPrice = (cartItems: CartItem[]) =>
    cartItems.reduce((prevVal, currVal) => (prevVal += currVal.totalPrice), 0);
