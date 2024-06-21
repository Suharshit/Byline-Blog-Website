import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    user: null,
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        userProfileCreated: (state, action) => {
            state.status = true;
            state.user = action.payload;
        },
        userProfileDeleted: (state) => {
            state.status = false;
            state.user = null;
        }
    }
})

export const {userProfileCreated, userProfileDeleted} = userProfileSlice.actions;
export default userProfileSlice.reducer;