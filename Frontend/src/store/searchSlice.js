import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: '',
        showSearch: false,
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setShowSearch: (state, action) => {
            state.showSearch = action.payload;
        },
        toggleShowSearch: (state) => {
            state.showSearch = !state.showSearch;
        },
    },
});

export const { setSearch, setShowSearch, toggleShowSearch } = searchSlice.actions;
export default searchSlice.reducer;
