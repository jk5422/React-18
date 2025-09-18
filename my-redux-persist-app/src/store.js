// src/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// redux-persist imports
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage for web

// optional: redux-state-sync
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

// 1) configure persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter'] // persist only counter slice; change as needed
};

// 2) combine reducers
const rootReducer = combineReducers({
    counter: counterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3) optional middleware for cross-tab sync
const reduxStateSyncMiddleware = createStateSyncMiddleware({
    // options: you can whitelist/blacklist action types if needed
    // whitelist: ['increment','decrement'] // or blacklist
});

// 4) configureStore with correct serializableCheck ignores for redux-persist
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // ignore redux-persist action types
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        }).concat(reduxStateSyncMiddleware) // append optional sync middleware
});

// 5) create persistor
export const persistor = persistStore(store);

// 6) initialize state sync so new tab can receive previous state
initStateWithPrevTab(store);

export default store;
