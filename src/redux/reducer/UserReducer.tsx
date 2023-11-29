import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserTableType } from '../../types/DB/UserTableType';

export interface UserStateType {
    login: boolean,
    info: UserTableType | null,
    joinState: boolean,
    techStack?: Array<string>,
};

const initialState: UserStateType = {
    login: false,
    info: null,
    joinState: false,
    techStack: [],
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
        },
        setJoinState: (state, action: PayloadAction<boolean>) => {
            state.joinState = action.payload;
        },
        setTechStack: (state, action: PayloadAction<Array<string>>) => {
            state.techStack = action.payload;
        },
        resetUser: () => initialState
    },
})

export const {
    setLogin, setUserInfo,
    setJoinState, setTechStack,
    resetUser
} = userSlice.actions;
export default userSlice.reducer;