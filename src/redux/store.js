import {configureStore} from '@reduxjs/toolkit'
import authReducer from './AuthSlice'
import categoryReducer from './CategorySlice'
import authModalReducer from './AuthModalSlice'
import cartReducer from './CartSlice'

export const store = configureStore({
    reducer: {
        category: categoryReducer,
        auth: authReducer,
        authModal: authModalReducer,
        cart: cartReducer
    }
})