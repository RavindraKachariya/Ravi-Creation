import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem('cartItems');
        return cartData ? JSON.parse(cartData) : {};
    } catch {
        return {};
    }
};

// Async thunk for adding to cart with localStorage persistence
export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ itemId, size }, { getState }) => {
        // Simulate async operation (can be replaced with actual API call)
        await new Promise(resolve => setTimeout(resolve, 100));
        const { cart } = getState();
        return { itemId, size, cartItems: cart.cartItems };
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        addToCart: (state, action) => {
            const { itemId, size } = action.payload;

            if (!size) {
                console.warn('Select Product Size');
                return;
            }

            if (state.cartItems[itemId]) {
                if (state.cartItems[itemId][size]) {
                    state.cartItems[itemId][size] += 1;
                } else {
                    state.cartItems[itemId][size] = 1;
                }
            } else {
                state.cartItems[itemId] = {};
                state.cartItems[itemId][size] = 1;
            }

            // Persist to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity: (state, action) => {
            const { itemId, size, quantity } = action.payload;

            if (state.cartItems[itemId]) {
                state.cartItems[itemId][size] = quantity;
            }

            // Persist to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const { itemId, size } = action.payload;

            if (state.cartItems[itemId] && state.cartItems[itemId][size]) {
                delete state.cartItems[itemId][size];
                if (Object.keys(state.cartItems[itemId]).length === 0) {
                    delete state.cartItems[itemId];
                }
            }

            // Persist to localStorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = {};
            localStorage.removeItem('cartItems');
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCartAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartLoading = (state) => state.cart.loading;

export const getCartCount = () => {
    return (state) => {
        let totalCount = 0;
        const cartItems = state.cart.cartItems;

        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    totalCount += cartItems[items][size];
                }
            }
        }

        return totalCount;
    };
};

export const getCartAmount = (products) => {
    return (state) => {
        let totalAmount = 0;
        const cartItems = state.cart.cartItems;

        for (const items in cartItems) {
            for (const size in cartItems[items]) {
                if (cartItems[items][size] > 0) {
                    const itemInfo = products.find(
                        (product) => product._id === items
                    );
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[items][size];
                    }
                }
            }
        }

        return totalAmount;
    };
};

export const { addToCart, updateQuantity, removeFromCart, clearCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
