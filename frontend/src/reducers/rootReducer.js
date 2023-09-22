// rootReducer.js
import { combineReducers } from 'redux';
import authSlice from '../slices/authSlice'; 
import articlesSlice from '../slices/articlesSlice';

const rootReducer = combineReducers({
  auth: authSlice, 
  articles:articlesSlice,
});

export default rootReducer;
