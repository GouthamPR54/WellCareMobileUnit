import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null, 
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null; 
        },
        signInFailurre: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null; 
        },
        signOut: (state)=> {
            state.currentUser=null;
            state.loading=false;
            state.error = false;
        },
    },
});

export const { signInStart, signInSuccess, signInFailurre, clearError, signOut } = userSlice.actions;

export default userSlice.reducer;
