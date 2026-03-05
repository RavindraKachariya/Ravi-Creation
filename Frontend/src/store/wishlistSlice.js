import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
    try {
        const wishlistData = localStorage.getItem('wishlist');
        return wishlistData ? JSON.parse(wishlistData) : [];
    } catch {
        return [];
    }
};

// Async thunk for adding to wishlist with localStorage persistence
export const addToWishlistAsync = createAsyncThunk(
    'wishlist/addToWishlistAsync',
    async (productId, { getState }) => {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 100));
        const { wishlist } = getState();
        return { productId, wishlist: wishlist.items };
    }
);

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: loadWishlistFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        addToWishlist: (state, action) => {
            const productId = action.payload;

            if (!state.items.includes(productId)) {
                state.items.push(productId);
                // Persist to localStorage
                localStorage.setItem('wishlist', JSON.stringify(state.items));
            }
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(id => id !== productId);
            // Persist to localStorage
            localStorage.setItem('wishlist', JSON.stringify(state.items));
        },
        clearWishlist: (state) => {
            state.items = [];
            localStorage.removeItem('wishlist');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToWishlistAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlistAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addToWishlistAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistLoading = (state) => state.wishlist.loading;

export const isInWishlist = (productId) => {
    return (state) => state.wishlist.items.includes(productId);
};

export const getWishlistCount = () => {
    return (state) => state.wishlist.items.length;
};

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
