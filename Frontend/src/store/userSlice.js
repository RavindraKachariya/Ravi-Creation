import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load user from localStorage
const loadUserFromStorage = () => {
    try {
        const userData = localStorage.getItem('user');
        return userData && userData !== "undefined" ? JSON.parse(userData) : null;
    } catch {
        return null;
    }
};

// Async thunk for login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch {
            return rejectWithValue('Login failed');
        }
    }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
    'user/logoutUser',
    async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        localStorage.removeItem('user');
        return null;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: loadUserFromStorage(),
        loading: false,
        error: null,
        isAuthenticated: !!loadUserFromStorage(),
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = !!action.payload;
            if (action.payload) {
                localStorage.setItem('user', JSON.stringify(action.payload));
            } else {
                localStorage.removeItem('user');
            }
        },
        updateUserProfile: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export const { setUser, updateUserProfile, clearError } = userSlice.actions;
export default userSlice.reducer;
