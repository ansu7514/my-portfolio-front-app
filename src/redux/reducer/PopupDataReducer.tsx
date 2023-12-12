import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PopupDataStateType {
    postData: string,
}

const initialState: PopupDataStateType = {
    postData: '',
};

export const popupDataSlice = createSlice({
    name: 'popupData',
    initialState,
    reducers: {
        setPostData: (state, action: PayloadAction<string>) => {
            state.postData = action.payload;
        },
        resetPopupData: () => initialState,
    },
})

export const { setPostData, resetPopupData } = popupDataSlice.actions;
export default popupDataSlice.reducer;