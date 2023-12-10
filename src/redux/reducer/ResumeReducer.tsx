import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { schoolApiType } from '../../types/ResumeType';

export interface ResumeStateType {
    schoolList: Array<schoolApiType>,
    schoolFromList: Array<string>,
    schoolToList: Array<string>,
};

const initialState: ResumeStateType = {
    schoolList: [],
    schoolFromList: [],
    schoolToList: [],
};

export const resumeSlice = createSlice({
    name: 'resume',
    initialState,
    reducers: {
        setSchoolList: (state, action: PayloadAction<Array<schoolApiType>>) => {
            state.schoolList = action.payload;
        },
        setSchoolFromList: (state, action: PayloadAction<Array<string>>) => {
            state.schoolFromList = action.payload;
        },
        setSchoolToList: (state, action: PayloadAction<Array<string>>) => {
            state.schoolToList = action.payload;
        },
        resetAboutMe: () => initialState
    },
})

export const {
    setSchoolList, setSchoolFromList,
    setSchoolToList,
    resetAboutMe
} = resumeSlice.actions;
export default resumeSlice.reducer;