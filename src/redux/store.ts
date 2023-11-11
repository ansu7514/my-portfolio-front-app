import { configureStore } from '@reduxjs/toolkit';

import sideMenuReducer from './reducer/SideMenuReducer';

export const store = configureStore({
    reducer: {
        sideMenu: sideMenuReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;