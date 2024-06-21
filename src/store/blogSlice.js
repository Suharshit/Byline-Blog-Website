import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    articleStatus: false,
    articleData: null
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        articleCreated: (state, action) => {
            state.articleStatus = true;
            state.articleData = action.payload;
        },
        articleDeleted: (state) => {
            state.articleStatus = false;
            state.articleData = null;
        }
    }
})

export const {articleCreated, articleDeleted} = blogSlice.actions;
export default blogSlice.reducer;