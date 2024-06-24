import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchPosts: []
}

const searchPostsSlice = createSlice({
    name: 'searchPosts',
    initialState,
    reducers: {
        setSearchPosts: (state, action) => {
            state.searchPosts = action.payload;
        }
    }
})

export const { setSearchPosts } = searchPostsSlice.actions;
export default searchPostsSlice.reducer;
