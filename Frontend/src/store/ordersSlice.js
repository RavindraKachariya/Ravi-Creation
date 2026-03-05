import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load orders from localStorage
const loadOrdersFromStorage = () => {
    try {
        const ordersData = localStorage.getItem('orders');
        return ordersData ? JSON.parse(ordersData) : [];
    } catch {
        return [];
    }
};

// Async thunk for placing order
export const placeOrderAsync = createAsyncThunk(
    'orders/placeOrderAsync',
    async ({ cartItems, total, deliveryFee }, { getState }) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total: total,
            deliveryFee: deliveryFee,
            date: new Date().toLocaleString(),
            status: "Order Confirmed"
        };

        const { orders } = getState();
        const updatedOrders = [...orders.orders, newOrder];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        return newOrder;
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: loadOrdersFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find(o => o.id === orderId);
            if (order) {
                order.status = status;
                localStorage.setItem('orders', JSON.stringify(state.orders));
            }
        },
        clearOrders: (state) => {
            state.orders = [];
            localStorage.removeItem('orders');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(placeOrderAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(placeOrderAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(placeOrderAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Selectors
export const selectOrders = (state) => state.orders.orders;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export const { addOrder, updateOrderStatus, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
