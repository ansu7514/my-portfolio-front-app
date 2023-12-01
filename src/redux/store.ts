import storageSession from 'redux-persist/lib/storage/session';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from "redux-persist";

import popupDataReducer from "./reducer/PopupDataReducer";
import popupReducer from "./reducer/PopupReducer";
import sideMenuReducer from "./reducer/SideMenuReducer";
import userReducer from "./reducer/UserReducer";

const rootReducer = combineReducers({
    popupData: popupDataReducer,
    popup: popupReducer,
    sideMenu: sideMenuReducer,
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['popupData', 'popup', 'sideMenu', 'user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;