import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { SideMenuStatus } from '../../types/SideMenuType';

export interface SideMenuStateType {
    sideMenuStatus: SideMenuStatus
};

const initialState: SideMenuStateType = {
    sideMenuStatus: SideMenuStatus.home,
};

export const sideMenuSlice = createSlice({
    name: 'sideMenu',
    initialState,
    reducers: {
        setSideMenuClick: (state, action: PayloadAction<SideMenuStatus>) => {
            state.sideMenuStatus = action.payload;
        },
    },
})

export const { setSideMenuClick } = sideMenuSlice.actions;
export default sideMenuSlice.reducer;