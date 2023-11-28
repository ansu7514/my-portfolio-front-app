import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PopupStateType {
    [key: string]: boolean;
    techStackPopup: boolean,
    postPopup: boolean,
}

const initialState: PopupStateType = {
    techStackPopup: false,
    postPopup: false,
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setTechStackPopup: (state, action: PayloadAction<boolean>) => {
            state.techStackPopup = action.payload;
        },
        setPostPopup: (state, action: PayloadAction<boolean>) => {
            state.postPopup = action.payload;
        },
    },
})

export const { setTechStackPopup, setPostPopup } = popupSlice.actions;
export default popupSlice.reducer;