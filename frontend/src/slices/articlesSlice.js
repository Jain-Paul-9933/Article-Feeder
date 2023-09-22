import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    list: [],
    selectedArticle: null,
  },
  reducers: {
    setArticles: (state, action) => {
      state.list = action.payload;
    },
    setSelectedArticle: (state, action) => {
      state.selectedArticle = action.payload;
    },
  },
});

export const { setArticles, setSelectedArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
