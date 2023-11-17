import { configureStore } from "@reduxjs/toolkit";

import popupDataReducer from "./reducer/PopupDataReducer";
import popupReducer from "./reducer/PopupReducer";
import sideMenuReducer from "./reducer/SideMenuReducer";
import userReducer from "./reducer/UserReducer";

export const store = configureStore({
    reducer: {
        popupData: popupDataReducer,
        popup: popupReducer,
        sideMenu: sideMenuReducer,
        user: userReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;