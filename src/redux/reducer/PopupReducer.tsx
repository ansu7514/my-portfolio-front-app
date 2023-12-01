import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PopupStateType {
    [key: string]: boolean;
    techStackPopup: boolean,
    funFactPopup: boolean,
    postPopup: boolean,
}

const initialState: PopupStateType = {
    techStackPopup: false,
    funFactPopup: false,
    postPopup: false,
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setPopuup: (state, action: PayloadAction<[string, boolean]>) => {
            const [popup, check] = action.payload;
            state[popup] = check;
        },
        resetPopup: () => initialState,
    },
})

export const { setPopuup, resetPopup } = popupSlice.actions;
export default popupSlice.reducer;