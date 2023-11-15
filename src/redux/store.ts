import { configureStore } from '@reduxjs/toolkit';

import sideMenuReducer from './reducer/SideMenuReducer';
import userReducer from './reducer/UserReducer';

export const store = configureStore({
    reducer: {
        sideMenu: sideMenuReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;