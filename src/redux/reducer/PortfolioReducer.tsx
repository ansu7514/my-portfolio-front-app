import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PortfolioTableType } from '../../types/DB/PortfolioTableType';

export interface PortfolioStateType {
    portfolioList: Array<PortfolioTableType>,
}

const initialState: PortfolioStateType = {
    portfolioList: [],
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setPortfolioList: (state, action: PayloadAction<Array<PortfolioTableType>>) => {
            state.portfolioList = action.payload;
        },
        resetPortfolio: () => initialState,
    },
})

export const { setPortfolioList, resetPortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;