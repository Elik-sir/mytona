import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import newsReducer from './news/reducer';

export default combineReducers({ user: userReducer, news: newsReducer });
