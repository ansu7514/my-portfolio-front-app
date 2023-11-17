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
    },
})

export const { setPostData } = popupDataSlice.actions;
export default popupDataSlice.reducer;