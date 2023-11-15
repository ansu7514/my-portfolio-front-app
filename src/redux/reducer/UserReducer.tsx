import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserTableType } from '../../types/DB/UserTableTypes';

export interface UserStateType {
    login: boolean,
    info: UserTableType | null
};

const initialState: UserStateType = {
    login: false,
    info: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<boolean>) => {
            state.login = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<UserTableType | null>) => {
            state.info = action.payload;
        }
    },
})

export const { setLogin, setUserInfo } = userSlice.actions;
export default userSlice.reducer;