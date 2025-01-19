import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabs: JSON.parse(localStorage.getItem('tabs')) || [], // Persisted tabs
    activeTab: localStorage.getItem('activeTab') || '/',  // Persisted active tab
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addTab(state, action) {
            const tabExists = state.tabs.some((tab) => tab.path === action.payload.path);
            if (!tabExists) {
                state.tabs.push(action.payload);
                localStorage.setItem('tabs', JSON.stringify(state.tabs));
            }
            state.activeTab = action.payload.path;
            localStorage.setItem('activeTab', state.activeTab);
        },
        closeTab(state, action) {
            state.tabs = state.tabs.filter((tab) => tab.path !== action.payload);
            localStorage.setItem('tabs', JSON.stringify(state.tabs));
            if (state.activeTab === action.payload && state.tabs.length > 0) {
                state.activeTab = state.tabs[state.tabs.length - 1].path;
            } else if (state.tabs.length === 0) {
                state.activeTab = '/';
            }
            localStorage.setItem('activeTab', state.activeTab);
        },
        setActiveTab(state, action) {
            state.activeTab = action.payload;
            localStorage.setItem('activeTab', state.activeTab);
        },
    },
});

export const { addTab, closeTab, setActiveTab } = tabsSlice.actions;
export default tabsSlice.reducer;
