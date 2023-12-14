import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { schoolApiType } from '../../types/ResumeType';
import { ResumeCodingSkillTableType, ResumeExperienceTableType } from '../../types/DB/ResumeTableType';

export interface ResumeStateType {
    schoolList: Array<schoolApiType>,
    schoolFromList: Array<string>,
    schoolToList: Array<string>,
    experienceList: Array<ResumeExperienceTableType>,
    skillPercnetList: Array<ResumeCodingSkillTableType>
};

const initialState: ResumeStateType = {
    schoolList: [],
    schoolFromList: [],
    schoolToList: [],
    experienceList: [],
    skillPercnetList: [],
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
        setSkillPercentList: (state, action: PayloadAction<Array<ResumeCodingSkillTableType>>) => {
            state.skillPercnetList = action.payload;
        },
        resetResume: () => initialState
    },
})

export const {
    setSchoolList, setSchoolFromList,
    setSchoolToList, setExperienceList,
    setSkillPercentList,
    resetResume
} = resumeSlice.actions;
export default resumeSlice.reducer;