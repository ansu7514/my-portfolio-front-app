import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { schoolApiType } from '../../types/ResumeType';
import { ResumeExperienceTableType } from '../../types/DB/ResumeTableType';

export interface ResumeStateType {
    schoolList: Array<schoolApiType>,
    schoolFromList: Array<string>,
    schoolToList: Array<string>,
    experienceList: Array<ResumeExperienceTableType>,
};

const initialState: ResumeStateType = {
    schoolList: [],
    schoolFromList: [],
    schoolToList: [],
    experienceList: [],
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
        setExperienceList: (state, action: PayloadAction<Array<ResumeExperienceTableType>>) => {
            state.experienceList = action.payload;
        },
        resetResume: () => initialState
    },
})

export const {
    setSchoolList, setSchoolFromList,
    setSchoolToList, setExperienceList,
    resetResume
} = resumeSlice.actions;
export default resumeSlice.reducer;