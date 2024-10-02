import { createSlice } from "@reduxjs/toolkit";

const loadersSlice = createSlice({ 
    name: 'loaders',
    initialState: {
        loading: false
    },
    reducers: {
        ShowLoading: (state) => { 
            state.loading = true
        },
        Hideloading: (state) => {
            state.loading = false
        }
    }
});

export const {ShowLoading, Hideloading} = loadersSlice.actions;
export default loadersSlice.reducer;
