import { createSlice } from "@reduxjs/toolkit";
import productData from "../productData";

const initialState = {
    cart: [],
    items: productData,
    totalQuantity: 0,
    totalPrice: 0
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload.id);
            if (find >= 0) {
                state.cart[find].quantity += 1;
            } else {
                const item = { ...action.payload, quantity: 1 };
                state.cart.push(item);
            }
            state.totalQuantity += 1;
            state.totalPrice += action.payload.price;
        },
        decrementQuantity: (state, action) => {
            let find = state.cart.findIndex((item) => item.id === action.payload.id);
            if (find >= 0 && state.cart[find].quantity > 1) {
                state.cart[find].quantity -= 1;
                state.totalQuantity -= 1;
                state.totalPrice -= action.payload.price;
            } else if (find >= 0 && state.cart[find].quantity === 1) {
                state.cart = state.cart.filter((item) => item.id !== action.payload.id);
                state.totalQuantity -= 1;
                state.totalPrice -= action.payload.price;
            }
        },
        removeFromCart: (state, action) => {
            const itemToRemove = state.cart.find((item) => item.id === action.payload.id);
            if (itemToRemove) {
                state.totalQuantity -= itemToRemove.quantity;
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.cart = state.cart.filter((item) => item.id !== action.payload.id);
            }
        },
        getCartTotal: (state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                }
            );
            state.totalPrice = parseInt(totalPrice.toFixed(2));
            state.totalQuantity = totalQuantity;
        }
    }
});

export const { addToCart, decrementQuantity, removeFromCart, getCartTotal } = cartSlice.actions;
export default cartSlice.reducer;
