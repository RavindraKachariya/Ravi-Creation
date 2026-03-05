import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import userReducer from './userSlice';
import ordersReducer from './ordersSlice';
import searchReducer from './searchSlice';

// Logger middleware for Redux
const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('prev state:', store.getState());
    const result = next(action);
    console.log('next state:', store.getState());
    console.groupEnd();
    return result;
};

// Configure store with Redux Toolkit and middleware
const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        user: userReducer,
        orders: ordersReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for non-serializable values
                ignoredActions: ['cart/setCartItems', 'user/setUser'],
            },
        }).concat(logger),
});

export default store;
