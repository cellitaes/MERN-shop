import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartItem } from '../../interfaces/Cart';
import { Product } from '../../interfaces/Product';

const initialState: { items: CartItem[]; totalQuantity: number } = {
    items: [],
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product | CartItem>) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item._id === newItem._id
            );
            state.totalQuantity++;

            if (!existingItem) {
                state.items.push({
                    _id: newItem._id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            window.localStorage.setItem(
                'cart',
                JSON.stringify({
                    totalQuantity: state.totalQuantity,
                    cartItems: state.items,
                })
            );
        },
        removeItemFromCart(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item._id === id);

            if (!existingItem) return;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item._id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
            state.totalQuantity--;

            window.localStorage.setItem(
                'cart',
                JSON.stringify({
                    totalQuantity: state.totalQuantity,
                    cartItems: state.items,
                })
            );
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;

            window.localStorage.setItem('cart', '');
        },
        setCart(state, action) {
            const { cartItems, totalQuantity } = action.payload;

            state.items = cartItems;
            state.totalQuantity = totalQuantity;

            window.localStorage.setItem(
                'cart',
                JSON.stringify({
                    totalQuantity: state.totalQuantity,
                    cartItems: state.items,
                })
            );
        },
    },
});

export const cartActions = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
