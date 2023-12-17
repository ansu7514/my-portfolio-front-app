import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PortfolioTableType } from '../../types/DB/PortfolioTableType';

export interface PortfolioStateType {
    portfolioId: number,
    portfolioUpload: boolean,
    portfolioList: Array<PortfolioTableType>,
}

const initialState: PortfolioStateType = {
    portfolioId: 0,
    portfolioUpload: false,
    portfolioList: [],
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolioId: (state, action: PayloadAction<number>) => {
            state.portfolioId = action.payload;
        },
        setPortfolioUpload: (state, action: PayloadAction<boolean>) => {
            state.portfolioUpload = action.payload;
        },
        setPortfolioList: (state, action: PayloadAction<Array<PortfolioTableType>>) => {
            state.portfolioList = action.payload;
        },
        resetPortfolio: () => initialState,
    },
})

export const {
    setPortfolioId, setPortfolioUpload,
    setPortfolioList,
    resetPortfolio
} = portfolioSlice.actions;
export default portfolioSlice.reducer;