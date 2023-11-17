import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PopupStateType {
    [key: string]: boolean;
    postPopup: boolean,
}

const initialState: PopupStateType = {
    postPopup: false,
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setPostPopup: (state, action: PayloadAction<boolean>) => {
            state.postPopup = action.payload;
        },
    },
})

export const { setPostPopup } = popupSlice.actions;
export default popupSlice.reducer;