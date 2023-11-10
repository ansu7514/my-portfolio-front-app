import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
    value: boolean
};

const initialState: CounterState = {
    value: false,
}

export const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        setValue: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
        },
    },
})

export const { setValue } = testSlice.actions;
export default testSlice.reducer;