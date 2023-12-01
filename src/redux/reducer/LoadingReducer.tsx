import { createSlice } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: () => true,
        resetLoading: () => initialState
    },
})

export const { setLoading, resetLoading } = loadingSlice.actions;
export default loadingSlice.reducer;