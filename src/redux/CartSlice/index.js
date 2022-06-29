import { createSlice } from '@reduxjs/toolkit'

const items = localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cartItems: items,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id)
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.cartItems.push(action.payload)
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            
        },
        removeCartItem: (state, action) => {
            const removeItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id)
            if (removeItemIndex > -1) {
                state.cartItems.splice(removeItemIndex, 1)
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            }

        },
        removeCart: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        updateCartItem: (state, action) => {
            state.cartItems = state.cartItems.map(item => {
                if (action.payload._id === item._id) {
                    return { ...item, quantity: action.payload.quantity }
                }
                return item
            })
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
    }
});

export const { addCartItem, removeCartItem, removeCart, updateCartItem } = cartSlice.actions

export default cartSlice.reducer