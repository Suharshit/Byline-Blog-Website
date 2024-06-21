import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import userProfileSlice from "./userProfileSlice";
import blogSlice from "./blogSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: blogSlice,
        userProfile: userProfileSlice
    }
})

export default store