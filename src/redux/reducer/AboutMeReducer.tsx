import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AboutMeStateType {
    techStacks: Array<string>,
    funFacts: Array<string>,
};

const initialState: AboutMeStateType = {
    techStacks: [],
    funFacts: [],
};

export const aboutMeSlice = createSlice({
    name: 'aboutMe',
    initialState,
    reducers: {
        setTechStacks: (state, action: PayloadAction<Array<string>>) => {
            state.techStacks = action.payload;
        },
        setFunFacts: (state, action: PayloadAction<Array<string>>) => {
            state.funFacts = action.payload;
        },
        resetAboutMe: () => initialState
    },
})

export const {
    setTechStacks, setFunFacts,
    resetAboutMe
} = aboutMeSlice.actions;
export default aboutMeSlice.reducer;