import { configureStore } from '@reduxjs/toolkit';
import tabsReducer from './reducers/tabSlice';

const store = configureStore({
    reducer: {
        tabs: tabsReducer,
    },
});

export default store;
