import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        credentials: {},
        ShouldUpdateHeader: false,
    },
    reducers: {

        login: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        updateHeader: state => {
            state.ShouldUpdateHeader = !state.ShouldUpdateHeader;
        }
    }
});

export const { login, logout, updateHeader } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;

export const selectShouldUpdateHeader = state => state.user.ShouldUpdateHeader;