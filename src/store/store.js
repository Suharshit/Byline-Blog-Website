import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice'
import userProfileSlice from "./userProfileSlice";
import blogSlice from "./blogSlice";
import searchPostsSlice from "./searchPostsSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: blogSlice,
        userProfile: userProfileSlice,
        searchPosts: searchPostsSlice,
    }
})

export default store